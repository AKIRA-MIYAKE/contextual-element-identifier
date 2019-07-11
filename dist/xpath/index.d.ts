import { ElementFragment, ElementIdentifier } from '../identifier/interfaces';
export declare const toAbsoluteXPath: (identifier: ElementIdentifier) => string;
export declare const toUniqueXPath: (identifier: ElementIdentifier) => string;
export declare const toChromeLikeXPath: (identifier: ElementIdentifier) => string;
export declare const toSiblingsXPath: (identifier: ElementIdentifier | ElementIdentifier[]) => string;
export declare const toAncestorXPath: (identifiers: ElementIdentifier[][]) => string;
export declare const xpathFromFragmentsUsingUniqueKey: (fragments: ElementFragment[]) => string;
export declare const greedyXPathFromFragments: (fragmetns: ElementFragment[]) => string;
export declare const siblingsXPathFromFragments: (fragmetns: ElementFragment[]) => string;
