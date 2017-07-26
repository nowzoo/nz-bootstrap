import { ComponentFactoryResolver, Injector, ApplicationRef, RendererFactory2, ElementRef } from '@angular/core';
import { NzbTooltipOptions } from './nzb-tooltip-options';
import { NzbTooltip } from './nzb-tooltip';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
export declare class NzbTooltipService {
    private rendererFactory;
    private appRef;
    private cfr;
    private injector;
    private contentFactory;
    private defaultOptions;
    private renderer;
    constructor(rendererFactory: RendererFactory2, appRef: ApplicationRef, cfr: ComponentFactoryResolver, injector: Injector, contentFactory: NzbContentRefFactoryService, defaultOptions: NzbTooltipOptions);
    create(content: any, options: any, target: ElementRef): NzbTooltip;
    private normalizeOptions(raw);
}
