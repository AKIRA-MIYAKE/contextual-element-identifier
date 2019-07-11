import { ElementIdentifier, ElementFragment } from './interfaces';
export interface DifferentIgnoreOptions {
    nodeName?: boolean;
    index?: boolean;
    id?: boolean;
    clsasName?: boolean;
    role?: boolean;
    depth?: boolean;
}
export declare const siblingsFragmentsFromIdentifiers: (identifiers: ElementIdentifier[]) => ElementFragment[];
export declare const siblingsFragmentsFromFragments: (fragments: ElementFragment[]) => ElementFragment[];
export declare const siblingsFragmentsFromSameDepthIdentifiers: (head: ElementIdentifier, tail: ElementIdentifier[]) => ElementFragment[];
export declare const siblingsFragmentsFromDifferentDepthIdentifiers: (head: ElementIdentifier, tail: ElementIdentifier[]) => ElementFragment[];
export declare const ancestorFragmetnsFromIdentifiers: (identifiers: ElementIdentifier[]) => ElementFragment[];
export declare const intersectionLeft: (fragments0: ElementFragment[], fragments1: ElementFragment[]) => ElementFragment[];
export declare const intersectionRight: (fragments0: ElementFragment[], fragments1: ElementFragment[]) => ElementFragment[];
export declare const findRepeatingLastIndexAndNodeName: (fragments: ElementFragment[]) => {
    index: number;
    nodeName: string | undefined;
};
export declare const findDifferentFragmentIndices: (fragments0: ElementFragment[], fragments1: ElementFragment[], options?: DifferentIgnoreOptions) => number[];
export declare const isDifferentFragment: (fragment0: ElementFragment, fragment1: ElementFragment, options?: DifferentIgnoreOptions) => boolean;
export declare const unconstrainedDifferentParams: (fragment0: ElementFragment, fragment1: ElementFragment) => ElementFragment;
