import { OnInit, OnChanges, AfterViewInit, ElementRef, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
export declare class NzbPopoverDirective implements OnInit, OnChanges, AfterViewInit {
    private element;
    private cfr;
    private appRef;
    content: any;
    animate: boolean;
    container: false | string;
    delay: number | object;
    popoverTitle: string;
    trigger: any;
    options: any;
    constructor(element: ElementRef, cfr: ComponentFactoryResolver, appRef: ApplicationRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    updateOptions(): void;
}
