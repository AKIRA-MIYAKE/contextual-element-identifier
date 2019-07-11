import { ElementFragment } from '../identifier/interfaces';
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
export declare const buidlNodeName: (fragment: ElementFragment, options?: XPathOptions) => string;
export declare const buildCondition: (fragment: ElementFragment, options?: XPathOptions) => any;
export declare const buildIdCondition: (fragment: ElementFragment, options: XPathInnerOptions) => any;
export declare const buildClassNameCondition: (fragment: ElementFragment, options: XPathInnerOptions) => any;
export declare const buildRoleCondition: (fragment: ElementFragment, options: XPathInnerOptions) => any;
export declare const buildPositionCondition: (fragment: ElementFragment, options: XPathInnerOptions) => any;
export declare const joinConditionsByAnd: (conditions: any[]) => any;
export declare const joinConditionsByOr: (conditions: any[]) => any;
