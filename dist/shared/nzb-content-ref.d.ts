import { ComponentRef, ViewRef } from '@angular/core';
export declare class NzbContentRef {
    nodes: any[];
    viewRef: ViewRef;
    componentRef: ComponentRef<any>;
    constructor(nodes: any[], viewRef?: ViewRef, componentRef?: ComponentRef<any>);
}
