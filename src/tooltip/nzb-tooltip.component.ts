import {
	Component,
	OnInit,
	Renderer2,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef
} from '@angular/core';

import {
	trigger,
	state,
	style,
	animate,
	transition,
	AnimationEvent
} from '@angular/animations';

import { INzbTooltipOptions } from './interfaces';
import { NzbPlacements } from '../shared/constants';
import { NzbPopupHelper } from '../shared/nzb-popup-helper';
import { NzbTooltipOptions } from './nzb-tooltip-options';
import { NzbTooltip } from './nzb-tooltip';

import Popper from 'popper.js';

@Component({
	selector: 'nzb-tooltip',
	template: `
	<div [attr.class]="tooltipClasses" role="tooltip"
		#tooltipElement
		[@visibilityState]="visibilityState"
		(@visibilityState.done)="animationDone($event)">
		<div class="tooltip-arrow"></div>
		<div class="tooltip-inner"><ng-content></ng-content></div>
	</div>
	`,
	animations: [
		trigger('visibilityState', [
			state('gone', style({
				display: 'none'
			})),
			state('ready', style({
				opacity: 0,
				display: 'block'
			})),
			state('shown',   style({
				opacity: 1,
				display: 'block'
			})),
			state('shownNonAnimated',   style({
				opacity: 1,
				display: 'block'
			})),
			transition('shown <=> ready', animate('.3s ease-out'))
		])
	]

})
export class NzbTooltipComponent implements OnInit {
	@Input() options: INzbTooltipOptions;
	@Input() tooltip: NzbTooltip;
	@Input() target: ElementRef;
	@Output() onShown: EventEmitter<any> = new EventEmitter();
	@Output() onHidden: EventEmitter<any> = new EventEmitter();
	@ViewChild('tooltipElement') tooltipElement: ElementRef;

	tooltipClasses: string = 'tooltip';
	visibilityState: string  = 'gone';
	popper: Popper = null;
	constructor(
		private renderer: Renderer2
	) { }

	ngOnInit() {

	}



	animationDone(event:AnimationEvent) {
		if (event.fromState === 'gone') {
			if(event.toState === 'ready') {
				let state = this.options.animation ? 'shown' : 'shownNonAnimated';
				this.popper.update();
				setTimeout(() => {
					this.visibilityState = state;
				});
				return;
			}
		}

		if (event.fromState === 'ready') {
			if (event.toState.indexOf('shown') === 0) {
				this.popper.update();
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
		this.popper = new Popper(
			this.target.nativeElement,
			this.tooltipElement.nativeElement,
			{
				placement: <Popper.Placement>this.options.placement,
				onCreate: (data: Popper.Data) => {
					this.onPopperUpdated(data)
				},
				onUpdate: (data: Popper.Data) => {
					this.onPopperUpdated(data)
				}
			}
		);
		setTimeout(() => {
			this.visibilityState = 'ready';
		})
	}
	hide() {
		setTimeout(() => {
			this.visibilityState = 'ready'
		})
	}

	onPopperUpdated(data: Popper.Data){
		this.tooltipClasses = 'tooltip tooltip-' + data.placement;
	}

}
