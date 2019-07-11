import { ElementIdentifier, ElementFragment, UniqueKey } from './interfaces';
export declare const identifierFromElement: (element: Element, ignoreClassNames?: string[], document?: Document) => ElementIdentifier;
export declare const fragmentsFromElement: (element: Element, ignoreClassNames: string[]) => ElementFragment[];
export declare const extractIdIfExists: (element: Element) => string | undefined;
export declare const extractClassNames: (element: Element, ignoreClassNames: string[]) => string[];
export declare const extractRoles: (element: Element) => string[];
export declare const getUniqueKey: (element: Element) => UniqueKey;
export declare const getSameNodeNameSiblings: (element: Element) => Element[];
