import _ from 'lodash';

import { ElementIdentifier, ElementFragment, UniqueKey } from './interfaces';

export interface DifferentIgnoreOptions {
  nodeName?: boolean;
  index?: boolean;
  id?: boolean;
  clsasName?: boolean;
  role?: boolean;
  depth?: boolean;
}

export const siblingsFragmentsFromIdentifiers = (
  identifiers: ElementIdentifier[]
): ElementFragment[] => {
  const head = _.head(identifiers);
  const tail = _.tail(identifiers);

  if (!head) {
    return [];
  }

  if (tail.length === 0) {
    return siblingsFragmentsFromFragments(head.absolute);
  } else if (
    tail.every(
      identifier => identifier.absolute.length === head.absolute.length
    )
  ) {
    return siblingsFragmentsFromSameDepthIdentifiers(head, tail);
  } else {
    return siblingsFragmentsFromDifferentDepthIdentifiers(head, tail);
  }
};

export const siblingsFragmentsFromFragments = (
  fragments: ElementFragment[]
): ElementFragment[] => {
  const { index, nodeName } = findRepeatingLastIndexAndNodeName(fragments);

  switch (nodeName) {
    case 'li':
    case 'dt':
    case 'dd':
    case 'tr':
      return fragments.map((f, i) => (i === index ? { ...f, index: -1 } : f));
    case 'th':
    case 'td': {
      const left = fragments
        .slice(0, index)
        .map(f => (f.nodeName === 'tr' ? { ...f, index: -1 } : f));
      const right = fragments.slice(index);
      return [...left, ...right];
    }
    default:
      return fragments.map(f => (f.hasSiblings ? { ...f, index: -1 } : f));
  }
};

export const siblingsFragmentsFromSameDepthIdentifiers = (
  head: ElementIdentifier,
  tail: ElementIdentifier[]
): ElementFragment[] => {
  return tail.reduce((acc, current) => {
    const indices = findDifferentFragmentIndices(acc, current.absolute);
    return acc.map((f, i) => {
      if (indices.includes(i)) {
        return unconstrainedDifferentParams(f, current.absolute[i]);
      } else {
        return f;
      }
    });
  }, head.absolute);
};

export const siblingsFragmentsFromDifferentDepthIdentifiers = (
  head: ElementIdentifier,
  tail: ElementIdentifier[]
): ElementFragment[] => {
  const left = tail.reduce((acc, current) => {
    return intersectionLeft(acc, current.absolute);
  }, head.absolute);

  const right = tail.reduce((acc, current) => {
    return intersectionRight(acc, current.absolute);
  }, head.absolute);

  return [...left, ...right];
};

export const ancestorFragmetnsFromIdentifiers = (
  identifiers: ElementIdentifier[]
): ElementFragment[] => {
  if (identifiers.length === 0) {
    return [];
  }

  const intersected = identifiers
    .map(i => i.absolute)
    .reduce((acc, current) => {
      return intersectionLeft(acc, current);
    });

  return siblingsFragmentsFromFragments(intersected);
};

export const intersectionLeft = (
  fragments0: ElementFragment[],
  fragments1: ElementFragment[]
): ElementFragment[] => {
  const options = {
    nodeName: false,
    id: false,
    role: false,
    classNmae: false,
    depth: false,
  };

  const zipped = _.zip(fragments0, fragments1);

  const intersected: ElementFragment[] = [];
  for (const arr of zipped) {
    const f0 = arr[0];
    const f1 = arr[1];

    if (typeof f0 !== 'undefined' && typeof f1 !== 'undefined') {
      const isDifferent = isDifferentFragment(f0, f1, options);
      if (!isDifferent) {
        intersected.push(unconstrainedDifferentParams(f0, f1));
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return intersected;
};

export const intersectionRight = (
  fragments0: ElementFragment[],
  fragments1: ElementFragment[]
): ElementFragment[] => {
  const options = {
    nodeName: false,
    id: true,
    role: false,
    className: true,
    depth: true,
  };

  const reversed0 = fragments0.reduceRight(
    (acc, current) => [...acc, current],
    [] as ElementFragment[]
  );

  const reversed1 = fragments1.reduceRight(
    (acc, current) => [...acc, current],
    [] as ElementFragment[]
  );

  const zipped = _.zip(reversed0, reversed1);

  const intersected: ElementFragment[] = [];
  for (const arr of zipped) {
    const f0 = arr[0];
    const f1 = arr[1];

    if (typeof f0 !== 'undefined' && typeof f1 !== 'undefined') {
      const isDifferent = isDifferentFragment(f0, f1, options);
      if (!isDifferent) {
        intersected.push(unconstrainedDifferentParams(f0, f1));
      } else {
        break;
      }
    } else {
      break;
    }
  }

  intersected.reverse();

  return intersected;
};

export const findRepeatingLastIndexAndNodeName = (
  fragments: ElementFragment[]
): { index: number; nodeName: string | undefined } => {
  const repeatingNodeName = ['li', 'dt', 'dd', 'tr', 'th', 'td'];
  const index = _.findLastIndex(fragments, f =>
    repeatingNodeName.includes(f.nodeName)
  );

  return {
    index,
    nodeName: fragments[index] ? fragments[index].nodeName : undefined,
  };
};

export const findDifferentFragmentIndices = (
  fragments0: ElementFragment[],
  fragments1: ElementFragment[],
  options: DifferentIgnoreOptions = {}
): number[] => {
  const zipped = _.zip(fragments0, fragments1).slice(0, fragments0.length);

  const indices: number[] = [];
  zipped.forEach((arr, index) => {
    const f0 = arr[0];
    const f1 = arr[1];

    if (typeof f0 !== 'undefined' && typeof f1 !== 'undefined') {
      if (isDifferentFragment(f0, f1, options)) {
        indices.push(index);
      }
    }
  });

  return indices;
};

export const isDifferentFragment = (
  fragment0: ElementFragment,
  fragment1: ElementFragment,
  options: DifferentIgnoreOptions = {}
): boolean => {
  const opts = {
    nodeName: false,
    index: false,
    id: false,
    className: false,
    role: false,
    depth: false,
    ...options,
  };

  const f0 = {
    ...fragment0,
    nodeName: opts.nodeName ? '*' : fragment0.nodeName,
    index: opts.index ? -1 : fragment0.index,
    id: opts.id ? undefined : fragment0.id,
    classNames: opts.className ? [] : fragment0.classNames,
    roles: opts.role ? [] : fragment0.roles,
    depth: opts.depth ? -1 : fragment0.depth,
  };

  const f1 = {
    ...fragment1,
    nodeName: opts.nodeName ? '*' : fragment1.nodeName,
    index: opts.index ? -1 : fragment1.index,
    id: opts.id ? undefined : fragment1.id,
    roles: opts.role ? [] : fragment1.roles,
    classNames: opts.className ? [] : fragment1.classNames,
    depth: opts.depth ? -1 : fragment1.depth,
  };

  return !_.isEqual(f0, f1);
};

export const unconstrainedDifferentParams = (
  fragment0: ElementFragment,
  fragment1: ElementFragment
): ElementFragment => {
  let fragment = { ...fragment0 };

  if (fragment0.nodeName !== fragment1.nodeName) {
    fragment = { ...fragment, nodeName: '*' };
  }

  if (fragment0.index !== fragment1.index) {
    fragment = { ...fragment, index: -1 };
  }

  if (fragment0.id !== fragment1.id) {
    fragment = { ...fragment, id: undefined };
  }

  if (!_.isEqual(fragment0.classNames, fragment1.classNames)) {
    const classNames = _.intersection(
      fragment0.classNames,
      fragment1.classNames
    );
    fragment = { ...fragment, classNames };
  }

  if (!_.isEqual(fragment0.roles, fragment1.roles)) {
    const roles = _.intersection(fragment0.roles, fragment1.roles);
    fragment = { ...fragment, roles };
  }

  if (fragment0.uniqueKey !== fragment1.uniqueKey) {
    fragment = { ...fragment, uniqueKey: UniqueKey.Index };
  }

  return fragment;
};
