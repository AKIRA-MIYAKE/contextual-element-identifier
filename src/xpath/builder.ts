import _ from 'lodash';

import { ElementFragment, UniqueKey } from '../identifier/interfaces';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const With = require('xpather').With;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Condition = require('xpather/built/condition').Condition;

export interface XPathOptions {
  id?: boolean;
  className?: boolean;
  role?: boolean;
  strict?: boolean;
  ignoreUniqueKey?: boolean;
}

export interface XPathInnerOptions {
  id: boolean;
  className: boolean;
  role: boolean;
  strict: boolean;
  ignoreUniqueKey: boolean;
}

export const buidlNodeName = (
  fragment: ElementFragment,
  options: XPathOptions = {}
): string => {
  const opts = {
    id: false,
    ...options,
  };

  return opts.id && typeof fragment.id !== 'undefined'
    ? '*'
    : fragment.nodeName;
};

export const buildCondition = (
  fragment: ElementFragment,
  options: XPathOptions = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const opts = {
    id: false,
    className: false,
    role: false,
    strict: true,
    ignoreUniqueKey: false,
    ...options,
  };

  const idCondition = buildIdCondition(fragment, opts);
  const classNameConditions = buildClassNameCondition(fragment, opts);
  const roleConditions = buildRoleCondition(fragment, opts);
  const positionCondition = buildPositionCondition(fragment, opts);

  const conditionArray = _.compact([
    idCondition,
    classNameConditions,
    roleConditions,
    positionCondition,
  ]);

  const conditions =
    conditionArray.length > 0
      ? opts.strict
        ? joinConditionsByAnd(conditionArray)
        : joinConditionsByOr(conditionArray)
      : undefined;

  return conditions;
};

export const buildIdCondition = (
  fragment: ElementFragment,
  options: XPathInnerOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (
    options.ignoreUniqueKey &&
    options.id &&
    typeof fragment.id !== 'undefined'
  ) {
    return With.exactId(fragment.id);
  } else {
    return undefined;
  }
};

export const buildClassNameCondition = (
  fragment: ElementFragment,
  options: XPathInnerOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (
    (!options.ignoreUniqueKey &&
      fragment.uniqueKey === UniqueKey.ClassName &&
      fragment.classNames.length > 0) ||
    (options.className && fragment.classNames.length > 0)
  ) {
    const arr = fragment.classNames.map((cn) => With.attribute('class', cn));
    return options.strict ? joinConditionsByAnd(arr) : joinConditionsByOr(arr);
  } else {
    return undefined;
  }
};

export const buildRoleCondition = (
  fragment: ElementFragment,
  options: XPathInnerOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (
    (!options.ignoreUniqueKey &&
      fragment.uniqueKey === UniqueKey.Role &&
      fragment.roles.length > 0) ||
    (options.role && fragment.roles.length > 0)
  ) {
    const arr = fragment.roles.map((r) => With.attribute('role', r));
    return options.strict ? joinConditionsByAnd(arr) : joinConditionsByOr(arr);
  } else {
    return undefined;
  }
};

export const buildPositionCondition = (
  fragment: ElementFragment,
  options: XPathInnerOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (!options.ignoreUniqueKey) {
    if (
      fragment.uniqueKey === UniqueKey.Index &&
      fragment.hasSiblings &&
      fragment.index + 1
    ) {
      return With.position(fragment.index + 1);
    } else {
      return undefined;
    }
  } else {
    if (!fragment.hasSiblings || fragment.index === -1) {
      return undefined;
    }

    if (options.id && typeof fragment.id !== 'undefined') {
      return undefined;
    }

    if (
      (options.className && fragment.classNames.length > 0) ||
      (options.role && fragment.roles.length > 0)
    ) {
      return new Condition(`position() = ${fragment.index + 1}`);
    } else {
      return With.position(fragment.index + 1);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const joinConditionsByAnd = (conditions: any[]): any => {
  return conditions.reduce((acc, current) => {
    return acc.and(current);
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const joinConditionsByOr = (conditions: any[]): any => {
  return conditions.reduce((acc, current) => {
    return acc.or(current);
  });
};
