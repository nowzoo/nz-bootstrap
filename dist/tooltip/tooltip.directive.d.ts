import { AfterViewInit, ElementRef } from '@angular/core';
export declare class NzbTooltipDirective implements AfterViewInit {
    private element;
    animation: boolean;
    container: any;
    delay: number | object;
    placement: string;
    trigger: string;
    constraints: any[];
    offset: string;
    tooltipTitle: any;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
}
