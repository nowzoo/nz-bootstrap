import { ComponentFactoryResolver, ReflectiveInjector, Renderer2 } from '@angular/core';
import { NzbContentRef } from './nzb-content-ref';
export declare class NzbContentRefFactoryService {
    private cfr;
    constructor(cfr: ComponentFactoryResolver);
    create(content: any, templateContext: any, contentComponenInjector: ReflectiveInjector, allowHTML: boolean, renderer: Renderer2): NzbContentRef;
}
