import {
	Injectable,
	ComponentRef,
	ComponentFactoryResolver,
	Injector,
	ApplicationRef,
	Renderer2,
	ReflectiveInjector,
	ElementRef,
	TemplateRef
} from '@angular/core';


import { NzbPopupHelper } from '../shared/nzb-popup-helper';
import { INzbPopup } from '../shared/interfaces';
import { NzbPlacements, NzbShowTriggers, NzbHideTriggers, NzbTriggers } from '../shared/constants';
import { NzbTooltipComponent } from './nzb-tooltip.component';
import { INzbTooltipOptions } from './interfaces';
import { NzbTooltipOptions } from './nzb-tooltip-options';

import { NzbContentRef } from '../shared/nzb-content-ref';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';


@Injectable()
export class NzbTooltip implements INzbPopup {

	private isOpen: boolean = false;
	private target: ElementRef = null;
	private content: any = null;
	private options: INzbTooltipOptions = null;

	private tooltipRef: ComponentRef<NzbTooltipComponent> = null;
	private contentRef: NzbContentRef = null;
	private eventUnsubscribes: any[] = null;

	private targetTitleRemoved: boolean = false;
	private targetAriaLabelAdded: boolean = false;
	private originalTargetTitle: string = null;

	constructor(
		private renderer: Renderer2,
		private appRef: ApplicationRef,
		private cfr: ComponentFactoryResolver,
		private injector: Injector,
		private contentFactory: NzbContentRefFactoryService
	){}

	setTooltip(
		target: ElementRef,
		content: any,
		options: INzbTooltipOptions,
	) {
		this.options = options;
		this.target = target;
		this.normalizeContentWithTargetTitle(content, target);
		this.resetEvents();

	}

	private normalizeContentWithTargetTitle (content: any, target: ElementRef) {
		let title = target.nativeElement.attributes.title;
		let ariaLabel = target.nativeElement.attributes['aria-label'];
		if (title) {
			title = title.value;
			this.originalTargetTitle = title;
			this.renderer.removeAttribute(target.nativeElement, 'title');

			this.targetTitleRemoved = true;
			if (! ariaLabel) {
				this.renderer.setAttribute(target.nativeElement, 'aria-label', title);
				this.targetAriaLabelAdded = true;
			}
			if (! content) {
				this.content = title;
			} else {
				this.content = content;
			}
		} else {
			if (content) {
				this.content = content;
			} else {
				this.content = 'missing valid tooltip content'
			}
		}


	}

	private resetEvents() {
		this.eventUnsubscribe();
		this.eventUnsubscribes = NzbPopupHelper.initPopupEvents(
			this, this.renderer, this.target, this.options.showTrigger, this.options.hideTrigger
		);
	}

	private eventUnsubscribe() {
		if (this.eventUnsubscribes){
			this.eventUnsubscribes.forEach(unsubscribe => {
				unsubscribe.call();
			});
			this.eventUnsubscribes = null;
		}
	}


	private addTooltipComponent() {
		this.contentRef = this.contentRef = this.contentFactory.create(
			this.content,
			{tooltip: this},
			ReflectiveInjector.resolveAndCreate(
				[{provide: NzbTooltip, useValue: this}], this.injector
			),
			this.options.html,
			this.renderer
		)
		const tooltipFactory = this.cfr.resolveComponentFactory(NzbTooltipComponent);
		if (this.contentRef.viewRef){
			this.appRef.attachView(this.contentRef.viewRef);
		}
		this.tooltipRef = tooltipFactory.create(this.injector, this.contentRef.nodes);
		this.tooltipRef.instance.options = this.options;
		this.tooltipRef.instance.tooltip = this;
		this.tooltipRef.instance.target = this.target;
		this.appRef.attachView(this.tooltipRef.hostView);
		this.renderer.appendChild(document.body, this.tooltipRef.location.nativeElement);
	}

	private removeTooltipComponent() {
		this.renderer.removeChild(document.body, this.tooltipRef.location.nativeElement);
		if (this.contentRef.viewRef){
			this.appRef.detachView(this.contentRef.viewRef);
		}
		if (this.contentRef.componentRef){
			this.contentRef.componentRef.destroy()
		}
		this.contentRef = null;
		this.appRef.detachView(this.tooltipRef.hostView);
		this.tooltipRef.destroy();
		this.tooltipRef = null;
	}



	destroy() {
		this.eventUnsubscribe();
		this.removeTooltipComponent();
		if (this.target.nativeElement) {
			if (this.targetTitleRemoved){
				this.renderer.setAttribute(this.target.nativeElement, 'title', this.originalTargetTitle);
				if (this.targetAriaLabelAdded){
					this.renderer.removeAttribute(this.target.nativeElement, 'aria-label');
				}
			}
		}
	}

	toggle() {
		console.log('toggle called on popup');
	}

	show(): Promise<NzbTooltip> {
		return this.open();
	}
	hide(): Promise<NzbTooltip> {
		return this.close();
	}

	private open(): Promise<NzbTooltip> {
		const p: Promise<NzbTooltip> = new Promise(resolve => {
			setTimeout(() => {
				this.addTooltipComponent();
				let sub = this.tooltipRef.instance.onShown.subscribe(()=>{
					sub.unsubscribe();
					resolve(this);
				});
				this.tooltipRef.instance.show();
			}, this.options.showDelay);

		});
		return p;
	}

	private close(): Promise<NzbTooltip> {
		const p: Promise<NzbTooltip> = new Promise(resolve => {

			setTimeout(() => {
				let sub = this.tooltipRef.instance.onHidden.subscribe(() => {
					this.removeTooltipComponent();
					sub.unsubscribe();
					resolve(this);
				});
				this.tooltipRef.instance.hide();
			}, this.options.hideDelay);
		})
		return p;
	}


}
