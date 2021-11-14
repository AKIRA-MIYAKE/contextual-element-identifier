import { ElementFragment, ElementIdentifier } from '../identifier/interfaces';
import { buidlNodeName, buildCondition, XPathOptions } from './builder';
import { takeMinHasId } from '../identifier/converter';
import {
  siblingsFragmentsFromIdentifiers,
  ancestorFragmetnsFromIdentifiers,
} from '../identifier/siblings';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const xpather = require('xpather');
const { x } = xpather;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Xpath = require('xpather/built/xpath').Xpath;

export const toAbsoluteXPath = (identifier: ElementIdentifier): string => {
  const xpath = identifier.absolute.reduce((acc, current) => {
    const options: XPathOptions = { ignoreUniqueKey: true };
    const nodeName = buidlNodeName(current, options);
    const condition = buildCondition(current, options);

    return condition ? acc.child(nodeName, condition) : acc.child(nodeName);
  }, new Xpath(''));

  return xpath.build();
};

export const toUniqueXPath = (identifier: ElementIdentifier): string => {
  return xpathFromFragmentsUsingUniqueKey(identifier.unique);
};

export const toChromeLikeXPath = (identifier: ElementIdentifier): string => {
  const minHasId = takeMinHasId(identifier.absolute);
  const xpath = minHasId.reduce((acc, current, index) => {
    const options: XPathOptions = { id: true, ignoreUniqueKey: true };
    const nodeName = buidlNodeName(current, options);
    const condition = buildCondition(current, options);

    if (index === 0 && current.depth !== 0) {
      return condition ? x(nodeName, condition) : x(nodeName);
    } else {
      return condition ? acc.child(nodeName, condition) : acc.child(nodeName);
    }
  }, new Xpath(''));

  return xpath.build();
};

export const toSiblingsXPath = (
  identifier: ElementIdentifier | ElementIdentifier[]
): string => {
  const identifiers = !Array.isArray(identifier) ? [identifier] : identifier;
  const fragments = siblingsFragmentsFromIdentifiers(identifiers);
  return siblingsXPathFromFragments(fragments);
};

export const toAncestorXPath = (identifiers: ElementIdentifier[][]): string => {
  const firstIdentifiers = identifiers.map((i) => i[0]);
  const fragments = ancestorFragmetnsFromIdentifiers(firstIdentifiers);
  return siblingsXPathFromFragments(fragments);
};

export const xpathFromFragmentsUsingUniqueKey = (
  fragments: ElementFragment[]
): string => {
  const xpath = fragments.reduce((acc, current, index, arr) => {
    const nodeName = buidlNodeName(current);
    const condition = buildCondition(current);

    if (index === 0 && current.depth !== 0) {
      return condition ? x(nodeName, condition) : x(nodeName);
    } else {
      const last = arr[index - 1];
      if (typeof last === 'undefined' || last.depth + 1 === current.depth) {
        return condition ? acc.child(nodeName, condition) : acc.child(nodeName);
      } else {
        return condition
          ? acc.descendant(nodeName, condition)
          : acc.descendant(nodeName);
      }
    }
  }, new Xpath(''));

  return xpath.build();
};

export const greedyXPathFromFragments = (
  fragmetns: ElementFragment[]
): string => {
  const xpath = fragmetns.reduce((acc, current, index, arr) => {
    const options: XPathOptions = {
      className: true,
      role: true,
      strict: false,
      ignoreUniqueKey: true,
    };
    const nodeName = buidlNodeName(current, options);
    const condition = buildCondition(current, options);

    if (index === 0 && current.depth !== 0) {
      return condition ? x(nodeName, condition) : x(nodeName);
    } else {
      const last = arr[index - 1];
      if (typeof last === 'undefined' || last.depth + 1 === current.depth) {
        return condition ? acc.child(nodeName, condition) : acc.child(nodeName);
      } else {
        return condition
          ? acc.descendant(nodeName, condition)
          : acc.descendant(nodeName);
      }
    }
  }, new Xpath(''));

  return xpath.build();
};

export const siblingsXPathFromFragments = (
  fragmetns: ElementFragment[]
): string => {
  const xpath = fragmetns.reduce((acc, current, index, arr) => {
    const options: XPathOptions = { strict: false };
    const nodeName = buidlNodeName(current, options);
    const condition = buildCondition(current, options);

    if (index === 0 && current.depth !== 0) {
      return condition ? x(nodeName, condition) : x(nodeName);
    } else {
      const last = arr[index - 1];
      if (typeof last === 'undefined' || last.depth + 1 === current.depth) {
        return condition ? acc.child(nodeName, condition) : acc.child(nodeName);
      } else {
        return condition
          ? acc.descendant(nodeName, condition)
          : acc.descendant(nodeName);
      }
    }
  }, new Xpath(''));

  return xpath.build();
};
