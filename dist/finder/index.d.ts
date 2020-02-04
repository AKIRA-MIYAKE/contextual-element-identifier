import { ElementIdentifier } from '../identifier/interfaces';
export declare const getElement: (identifier: ElementIdentifier, ignoreClassNames?: string[], document?: Document) => Element | undefined;
export declare const findElements: (identifier: ElementIdentifier, ignoreClassNames?: string[], document?: Document) => Element[];
export declare const findElementsWithPredicate: (identifier: ElementIdentifier, predicate: (element: Element) => boolean, document?: Document) => Element[];
export declare const getSiblingsElements: (identifier: ElementIdentifier | ElementIdentifier[], ignoreClassNames?: string[], document?: Document) => Element[];
export declare const getMultipleSiblingsElements: (identifiers: ElementIdentifier[][], ignoreClassNames?: string[], document?: Document) => (Element | undefined)[][];
export declare const evaluateXPath: (xpath: string, root?: Node, document?: Document) => Element[];
