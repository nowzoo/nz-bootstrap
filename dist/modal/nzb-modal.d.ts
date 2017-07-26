import { ComponentFactoryResolver, Injector, ApplicationRef, Renderer2 } from '@angular/core';
import { INzbModalOptions, INzbModalResult } from './interfaces';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
export declare class NzbModal {
    private content;
    private options;
    private renderer;
    private appRef;
    private cfr;
    private injector;
    private contentFactory;
    private result;
    private backdropRef;
    private modalRef;
    private contentRef;
    constructor(content: any, options: INzbModalOptions, renderer: Renderer2, appRef: ApplicationRef, cfr: ComponentFactoryResolver, injector: Injector, contentFactory: NzbContentRefFactoryService);
    show(): Promise<any>;
    private hide();
    dismiss(reason?: any): Promise<INzbModalResult>;
    close(data?: any): Promise<INzbModalResult>;
}
