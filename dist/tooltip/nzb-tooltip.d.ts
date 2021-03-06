import { ComponentFactoryResolver, Injector, ApplicationRef, Renderer2, ElementRef } from '@angular/core';
import { INzbPopup } from '../shared/interfaces';
import { INzbTooltipOptions } from './interfaces';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
export declare class NzbTooltip implements INzbPopup {
    private renderer;
    private appRef;
    private cfr;
    private injector;
    private contentFactory;
    private isOpen;
    private target;
    private content;
    private options;
    private tooltipRef;
    private contentRef;
    private eventUnsubscribes;
    private targetTitleRemoved;
    private targetAriaLabelAdded;
    private originalTargetTitle;
    constructor(renderer: Renderer2, appRef: ApplicationRef, cfr: ComponentFactoryResolver, injector: Injector, contentFactory: NzbContentRefFactoryService);
    setTooltip(target: ElementRef, content: any, options: INzbTooltipOptions): void;
    private normalizeContentWithTargetTitle(content, target);
    private resetEvents();
    private eventUnsubscribe();
    private addTooltipComponent();
    private removeTooltipComponent();
    destroy(): void;
    toggle(): void;
    show(): Promise<NzbTooltip>;
    hide(): Promise<NzbTooltip>;
    private open();
    private close();
}
