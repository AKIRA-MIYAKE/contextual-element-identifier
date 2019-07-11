export interface ElementIdentifier {
    absolute: ElementFragment[];
    unique: ElementFragment[];
}
export interface ElementFragment {
    nodeName: string;
    index: number;
    hasSiblings: boolean;
    id?: string;
    classNames: string[];
    roles: string[];
    depth: number;
    uniqueKey: UniqueKey;
}
export declare enum UniqueKey {
    ClassName = "className",
    Role = "role",
    Index = "index"
}
