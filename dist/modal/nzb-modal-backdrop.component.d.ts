import { OnInit, EventEmitter } from '@angular/core';
import { INzbModalOptions } from './interfaces';
export declare class NzbModalBackdropComponent implements OnInit {
    options: INzbModalOptions;
    onShown: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    visibilityState: string;
    constructor();
    ngOnInit(): void;
    animationDone(event: any): void;
    show(): void;
    hide(): void;
}
