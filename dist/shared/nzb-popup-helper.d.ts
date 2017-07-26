import { Renderer2, ElementRef } from '@angular/core';
import { INzbPopup } from './interfaces';
export declare class NzbPopupHelper {
    static initPopupEvents(popup: INzbPopup, renderer: Renderer2, target: ElementRef, showTrigger: string[], hideTrigger: string[]): any[];
}
