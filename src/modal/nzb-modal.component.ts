import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	Renderer2
} from '@angular/core';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	AnimationEvent
} from '@angular/animations';

import { NzbModal } from './nzb-modal';
import { INzbModalOptions } from './interfaces';

@Component({
	selector: 'nzb-modal',
	template: `
		<div #modalElement
			class="modal" tabindex="-1" role="dialog" [@modalState]="visibilityState"
			(click)="backdropClick($event)"
			(keyup.esc)="escapeKeyUp($event)">
			<div [ngClass]="dialogClasses" role="document"
				[@visibilityState]="visibilityState"
				(@visibilityState.done)="animationDone($event)">
				<div class="modal-content">
					<ng-content></ng-content>
				</div>
			</div>
		</div>
	`,
	animations: [
		trigger('modalState', [
			state('gone', style({
				display: 'none'
			})),
			state('ready', style({
				display: 'block'
			})),
			state('shown',   style({
				display: 'block'
			})),
			state('shownNonAnimated',   style({
				display: 'block'
			}))
		]),
		trigger('visibilityState', [
			state('gone', style({
				display: 'none'
			})),
			state('ready', style({
				transform: 'translate(0, -100%)',
				display: 'block'
			})),
			state('shown',   style({
				transform: 'translate(0, 0)',
				display: 'block'
			})),
			state('shownNonAnimated',   style({
				transform: 'translate(0, 0)',
				display: 'block'
			})),
			transition('shown <=> ready', animate('.3s ease-out'))
		])
	]
})
export class NzbModalComponent implements OnInit  {
	@Input() options: INzbModalOptions;
	@Output() onShown: EventEmitter<any> = new EventEmitter();
	@Output() onHidden: EventEmitter<any> = new EventEmitter();
	@ViewChild('modalElement') modalElement: ElementRef;
	visibilityState: string = 'gone';
	dialogClasses = 'modal-dialog';
	modal: NzbModal;
	constructor(
		private renderer: Renderer2
	) { }

	ngOnInit(){
		this.onShown.subscribe(() => {
			if (this.options.focusOnShow) {
				//this.renderer.
				this.modalElement.nativeElement.focus();
			}
		});
		this.dialogClasses = 'modal-dialog';
		if (['sm', 'lg'].indexOf(this.options.size) !== -1){
			this.dialogClasses += ' modal-' + this.options.size;
		}
	}

	animationDone(event: AnimationEvent){
		if (event.fromState === 'gone') {
			if(event.toState === 'ready') {
				let state = this.options.animation ? 'shown' : 'shownNonAnimated';
				setTimeout(() => {
					this.visibilityState = state;
				});
				return;
			}
		}

		if (event.fromState === 'ready') {
			if (event.toState.indexOf('shown') === 0) {
				this.onShown.emit(event);
				return;
			}
			if (event.toState === 'gone') {
				this.onHidden.emit(event);
				return;
			}
		}
		if (event.fromState.indexOf('shown') === 0) {
			if(event.toState === 'ready') {
				setTimeout(() => {
					this.visibilityState = 'gone';
				});
				return;
			}
		}

	}

	show() {
		setTimeout(() => {
			this.visibilityState = 'ready';
		})
	}

	hide() {
		setTimeout(() => {
			this.visibilityState = 'ready'
		})
	}

	backdropClick(event) {
		if (this.options.dismissOnBackdropClick && event.target === this.modalElement.nativeElement){
			this.modal.dismiss('backdropClick');
		}
	}
	escapeKeyUp($event) {
		if (this.options.dismissOnCancel && event.target === this.modalElement.nativeElement){
			this.modal.dismiss('escapeKeyUp');
		}
	}

}
