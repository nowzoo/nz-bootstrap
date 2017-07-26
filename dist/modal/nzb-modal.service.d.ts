import { ComponentFactoryResolver, Injector, ApplicationRef, RendererFactory2 } from '@angular/core';
import { INzbModalOptions } from './interfaces';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
export declare class NzbModalService {
    private rendererFactory;
    private appRef;
    private cfr;
    private injector;
    private contentFactory;
    private renderer;
    constructor(rendererFactory: RendererFactory2, appRef: ApplicationRef, cfr: ComponentFactoryResolver, injector: Injector, contentFactory: NzbContentRefFactoryService);
    create(content: any, options: any): Promise<any>;
    normalizeOptions(raw: any): INzbModalOptions;
}
