import _ from 'lodash';

import { ElementIdentifier, ElementFragment, UniqueKey } from './interfaces';
import { xpathFromFragmentsUsingUniqueKey } from '../xpath';
import { evaluateXPath } from '../finder';

export const identifierFromElement = (
  element: Element,
  ignoreClassNames: string[] = [],
  document: Document = window.document
): ElementIdentifier => {
  const absolute = fragmentsFromElement(element, ignoreClassNames);

  let unique: ElementFragment[] = [];
  for (let i = 0; i < absolute.length; i++) {
    const fragment = absolute[absolute.length - 1 - i];
    unique = [fragment, ...unique];
    const xpath = xpathFromFragmentsUsingUniqueKey(unique);
    const nodes = evaluateXPath(xpath, document, document);
    if (nodes.length === 1) {
      break;
    }
  }

  return { absolute, unique };
};

export const fragmentsFromElement = (
  element: Element,
  ignoreClassNames: string[]
): ElementFragment[] => {
  const innerFunc = (ele: Element): ElementFragment[] => {
    const nodeName = ele.nodeName.toLowerCase();
    const index = 0;
    const hasSiblings = false;
    const id = extractIdIfExists(ele);
    const classNames = extractClassNames(ele, ignoreClassNames);
    const roles = extractRoles(ele);
    const depth = -1;
    const uniqueKey = getUniqueKey(ele);

    let fragment = {
      nodeName,
      index,
      hasSiblings,
      id,
      classNames,
      roles,
      depth,
      uniqueKey,
    };

    if (
      !ele.parentElement ||
      ele.parentElement.nodeType !== 1 // Node.ELEMENT_NODE
    ) {
      return [fragment];
    }

    const siblings = getSameNodeNameSiblings(ele);

    if (siblings.length !== 1) {
      fragment = siblings.reduce(
        (acc, current, i) => {
          return current === ele ? { ...acc, index: i } : acc;
        },
        { ...fragment, hasSiblings: true }
      );
    }

    return [...innerFunc(ele.parentElement), fragment];
  };

  return innerFunc(element).map((f, i) => ({ ...f, depth: i }));
};

export const extractIdIfExists = (element: Element): string | undefined => {
  return element.id.length > 0 ? element.id : undefined;
};

export const extractClassNames = (
  element: Element,
  ignoreClassNames: string[]
): string[] => {
  const classNames = Array.from(element.classList).filter(
    (cn) => !ignoreClassNames.includes(cn)
  );
  return _.uniq(classNames);
};

export const extractRoles = (element: Element): string[] => {
  const roleString = element.getAttribute('role');

  if (!roleString) {
    return [];
  }

  const roles = roleString.split(' ');
  return _.uniq(roles);
};

export const getUniqueKey = (element: Element): UniqueKey => {
  if (
    !element.parentElement ||
    element.parentElement.nodeType !== 1 // Node.ELEMENT_NODE
  ) {
    return UniqueKey.Index;
  }

  const className = element.className;
  if (className.length > 0) {
    const sibs = element.parentElement.querySelectorAll(
      `[class="${className}"]`
    );
    if (sibs.length === 1) {
      return UniqueKey.ClassName;
    }
  }

  const roleString = element.getAttribute('role');
  if (roleString !== null && roleString.length > 0) {
    const sibs = element.parentElement.querySelectorAll(
      `[role="${roleString}"]`
    );
    if (sibs.length === 1) {
      return UniqueKey.Role;
    }
  }

  return UniqueKey.Index;
};

export const getSameNodeNameSiblings = (element: Element): Element[] => {
  const parentElement = element.parentElement;

  if (!parentElement) {
    return [element];
  }

  return Array.from(parentElement.children).filter(
    (ce) => ce.nodeName === element.nodeName
  );
};
