import { OnChanges, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { NzbTooltipService } from './nzb-tooltip.service';
import { NzbTooltip } from './nzb-tooltip';
export declare class NzbTooltipDirective implements OnChanges, AfterViewInit, OnDestroy {
    private element;
    private tooltipService;
    private renderer;
    placement: string;
    animation: boolean;
    showDelay: number;
    hideDelay: number;
    html: boolean;
    tooltipContent: any;
    tooltip: NzbTooltip;
    content: any;
    constructor(element: ElementRef, tooltipService: NzbTooltipService, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    updateContent(): void;
}
