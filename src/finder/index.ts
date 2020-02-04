import _ from 'lodash';

import { ElementIdentifier, ElementFragment } from '../identifier/interfaces';
import {
  toAbsoluteXPath,
  toUniqueXPath,
  toSiblingsXPath,
  toAncestorXPath,
  greedyXPathFromFragments,
} from '../xpath';

export const getElement = (
  identifier: ElementIdentifier,
  ignoreClassNames: string[] = [],
  document: Document = window.document
): Element | undefined => {
  const last = _.last(identifier.absolute);
  if (!last) {
    return undefined;
  }

  const xpath = toAbsoluteXPath(identifier);
  const result = evaluateXPath(xpath, document, document);

  if (
    result.length === 1 &&
    isMatchedAttributes(result[0], last, ignoreClassNames)
  ) {
    return result[0];
  } else {
    return undefined;
  }
};

export const findElements = (
  identifier: ElementIdentifier,
  ignoreClassNames: string[] = [],
  document: Document = window.document
): Element[] => {
  const last = _.last(identifier.absolute);
  if (!last) {
    return [];
  }

  const strictElement = getElement(identifier, ignoreClassNames, document);
  if (strictElement) {
    return [strictElement];
  }

  const uniqueXPath = toUniqueXPath(identifier);
  const uniqueResult = evaluateXPath(uniqueXPath, document, document);
  const uniqueMatched = uniqueResult.filter(e =>
    isMatchedAttributes(e, last, ignoreClassNames)
  );
  if (uniqueMatched.length === 1) {
    return uniqueMatched;
  }

  let elements: Element[] = [];
  let fragments: ElementFragment[] = [];
  for (let i = 0; i < identifier.absolute.length; i++) {
    const fragment = identifier.absolute[identifier.absolute.length - 1 - i];
    fragments = [fragment, ...fragments];
    const xpath = greedyXPathFromFragments(fragments);
    const elems = evaluateXPath(xpath, document, document);
    const matched = elems.filter(e =>
      isMatchedAttributes(e, last, ignoreClassNames)
    );
    if (matched.length === 1) {
      elements = matched;
      break;
    } else if (matched.length > 1) {
      elements = matched;
    }
  }

  return elements;
};

export const findElementsWithPredicate = (
  identifier: ElementIdentifier,
  predicate: (element: Element) => boolean,
  document: Document = window.document
): Element[] => {
  const last = _.last(identifier.absolute);
  if (!last) {
    return [];
  }

  const uniqueXPath = toUniqueXPath(identifier);
  const uniqueResult = evaluateXPath(uniqueXPath, document, document);
  const uniqueMatched = uniqueResult.filter(predicate);
  if (uniqueMatched.length === 1) {
    return uniqueMatched;
  }

  let elements: Element[] = [];
  let fragments: ElementFragment[] = [];
  for (let i = 0; i < identifier.absolute.length; i++) {
    const fragment = identifier.absolute[identifier.absolute.length - 1 - i];
    fragments = [fragment, ...fragments];
    const xpath = greedyXPathFromFragments(fragments);
    const elems = evaluateXPath(xpath, document, document);
    const matched = elems.filter(predicate);
    if (matched.length === 1) {
      elements = matched;
      break;
    } else if (matched.length > 1) {
      elements = matched;
    }
  }

  return elements;
};

export const getSiblingsElements = (
  identifier: ElementIdentifier | ElementIdentifier[],
  ignoreClassNames: string[] = [],
  document: Document = window.document
): Element[] => {
  const identifiers = !Array.isArray(identifier) ? [identifier] : identifier;
  const lasts = identifiers
    .map(i => _.last(i.absolute))
    .filter(f => typeof f !== 'undefined') as ElementFragment[];

  if (lasts.length === 0) {
    return [];
  }

  const xpath = toSiblingsXPath(identifier);
  const elements = evaluateXPath(xpath, document, document);

  return elements.filter(e => {
    return lasts.some(f => isMatchedAttributes(e, f, ignoreClassNames));
  });
};

export const getMultipleSiblingsElements = (
  identifiers: ElementIdentifier[][],
  ignoreClassNames: string[] = [],
  document: Document = window.document
): (Element | undefined)[][] => {
  if (identifiers.length === 0) {
    return [];
  }

  if (identifiers.length === 1) {
    const result = getSiblingsElements(
      identifiers[0],
      ignoreClassNames,
      document
    );
    return [result];
  }

  const ancestorXPath = toAncestorXPath(identifiers);
  const ancestorElements = evaluateXPath(ancestorXPath, document, document);

  const elementsArray = identifiers.map(identifier => {
    return getSiblingsElements(identifier, ignoreClassNames, document);
  });

  const maxLength = elementsArray.reduce((acc, current) => {
    return current.length > acc ? current.length : acc;
  }, 0);

  if (ancestorElements.length === maxLength) {
    const grouped = ancestorElements.map(ancestor => {
      return elementsArray.map(elements => {
        return elements.find(
          e =>
            // tslint:disable-next-line
            ancestor.compareDocumentPosition(e) & 16 //Node.DOCUMENT_POSITION_CONTAINED_BY
        );
      });
    });
    return _.zip(...grouped);
  } else {
    return elementsArray;
  }
};

const isMatchedAttributes = (
  element: Element,
  fragment: ElementFragment,
  ignoreClassNames: string[]
): boolean => {
  return (
    isMatchedId(element, fragment) &&
    isMatchedClassNames(element, fragment, ignoreClassNames) &&
    isMatchedRoles(element, fragment)
  );
};

const isMatchedId = (element: Element, fragment: ElementFragment): boolean => {
  const id = element.id.length > 0 ? element.id : undefined;
  return fragment.id === id;
};

const isMatchedClassNames = (
  element: Element,
  fragment: ElementFragment,
  ignoreClassNames: string[]
): boolean => {
  const classNames = Array.from(element.classList).filter(
    cn => !ignoreClassNames.includes(cn)
  );

  if (fragment.classNames.length === 0 && classNames.length === 0) {
    return true;
  }

  const intersected = _.intersection(fragment.classNames, classNames);
  return intersected.length > 0;
};

const isMatchedRoles = (
  element: Element,
  fragment: ElementFragment
): boolean => {
  const roleString = element.getAttribute('role');
  const roles = roleString ? roleString.split(' ') : [];
  if (fragment.roles.length === 0 && roles.length === 0) {
    return true;
  }

  const intersected = _.intersection(fragment.roles, roles);
  return intersected.length > 0;
};

export const evaluateXPath = (
  xpath: string,
  root: Node = window.document,
  document: Document = window.document
): Element[] => {
  const result = document.evaluate(
    root === document && !/^\./.test(xpath) ? xpath : `.${xpath}`,
    root,
    null,
    7, // XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  const elements: Element[] = [];
  for (let i = 0; i < result.snapshotLength; i++) {
    const node = result.snapshotItem(i);
    if (node && node.nodeType === 1) {
      // Node.ELEMENT_NODE
      elements.push(node as Element);
    }
  }

  return elements;
};
