import { OnInit, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { NzbModal } from './nzb-modal';
import { INzbModalOptions } from './interfaces';
export declare class NzbModalComponent implements OnInit {
    private renderer;
    options: INzbModalOptions;
    onShown: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    modalElement: ElementRef;
    visibilityState: string;
    dialogClasses: string;
    modal: NzbModal;
    constructor(renderer: Renderer2);
    ngOnInit(): void;
    animationDone(event: AnimationEvent): void;
    show(): void;
    hide(): void;
    backdropClick(event: any): void;
    escapeKeyUp($event: any): void;
}
