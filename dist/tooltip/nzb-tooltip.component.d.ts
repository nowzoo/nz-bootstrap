/// <reference types="popper.js" />
import { OnInit, Renderer2, EventEmitter, ElementRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { INzbTooltipOptions } from './interfaces';
import { NzbTooltip } from './nzb-tooltip';
import Popper from 'popper.js';
export declare class NzbTooltipComponent implements OnInit {
    private renderer;
    options: INzbTooltipOptions;
    tooltip: NzbTooltip;
    target: ElementRef;
    onShown: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    tooltipElement: ElementRef;
    tooltipClasses: string;
    visibilityState: string;
    popper: Popper;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    animationDone(event: AnimationEvent): void;
    show(): void;
    hide(): void;
    onPopperUpdated(data: Popper.Data): void;
}
