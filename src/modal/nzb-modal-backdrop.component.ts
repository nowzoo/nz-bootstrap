import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


import { INzbModalOptions } from './interfaces';


@Component({
	selector: 'nzb-modal-backdrop',
	exportAs: 'nzbModalBackdrop',
	template: `<div class="modal-backdrop"
		[@visibilityState]="visibilityState"
		(@visibilityState.done)="animationDone($event)"
		></div>`,
	animations: [
		trigger('visibilityState', [
			state('hidden', style({
				opacity: 0,
				display:'none'
			})),
			state('shown',   style({
				opacity: .5,
				display:'block'
			})),
			state('notShown',   style({
				opacity: 0,
				display:'none'
			})),
			state('shownNonAnimated',   style({
				opacity: .5,
				display:'block'
			})),
			transition('hidden <=> shown', animate('.15s linear')),
		])
	]
})
export class NzbModalBackdropComponent implements OnInit {
	@Input() options: INzbModalOptions;
	@Output() onShown: EventEmitter<any> = new EventEmitter();
	@Output() onHidden: EventEmitter<any> = new EventEmitter();
	visibilityState: string = 'hidden';


	constructor() { }

	ngOnInit() {
		this.visibilityState = 'hidden'
	}
	animationDone(event){
		if (event.fromState === 'hidden'){
			if (event.toState === 'shown' || event.toState === 'notShown' || event.toState === 'shownNonAnimated'){
				this.onShown.emit(event);
				return;
			}
		}
		if (event.fromState === 'shown' || event.fromState === 'notShown' || event.fromState === 'shownNonAnimated'){
			if (event.toState === 'hidden'){
				this.onHidden.emit(event);
				return;
			}
		}

	}

	show() {
		let state;
		if (this.options.backdrop) {
			state = this.options.animation ? 'shown' : 'shownNonAnimated';
		} else {
			state = 'notShown';
		}
		setTimeout(() => {
			this.visibilityState = state;
		});
	}

	hide(){
		setTimeout(() => {
			this.visibilityState = 'hidden'
		})
	}


}
