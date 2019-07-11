import { ElementIdentifier } from '../identifier/interfaces';
export declare const getElement: (identifier: ElementIdentifier, document?: Document) => Element | undefined;
export declare const findElements: (identifier: ElementIdentifier, document?: Document) => Element[];
export declare const findElementsWithPredicate: (identifier: ElementIdentifier, predicate: (element: Element) => boolean, document?: Document) => Element[];
export declare const getSiblingsElements: (identifier: ElementIdentifier | ElementIdentifier[], document?: Document) => Element[];
export declare const getMultipleSiblingsElements: (identifiers: ElementIdentifier[][], document?: Document) => (Element | undefined)[][];
export declare const evaluateXPath: (xpath: string, root?: Node, document?: Document) => Element[];
