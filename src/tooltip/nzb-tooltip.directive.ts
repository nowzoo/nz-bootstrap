import {
	Directive,
	OnChanges,
	AfterViewInit,
	OnDestroy,
	ElementRef,
	Input,
	Renderer2
} from '@angular/core';

import { NzbTooltipService } from './nzb-tooltip.service';
import { NzbTooltip } from './nzb-tooltip';
@Directive({
  	selector: '[nzbTooltip]'
})
export class NzbTooltipDirective implements OnChanges, AfterViewInit, OnDestroy{
	@Input() placement: string;
	@Input() animation: boolean;
	@Input() showDelay: number;
	@Input() hideDelay: number;
	@Input() html: boolean;
	@Input() tooltipContent: any;

	tooltip: NzbTooltip = null;
	content: any;

	constructor(
		private element: ElementRef,
		private tooltipService: NzbTooltipService,
		private renderer: Renderer2
	) { }

	ngAfterViewInit() {
		
		const options: any = {
			placement: this.placement,
			animation: this.animation,
			showDelay: this.showDelay,
			hideDelay: this.hideDelay,
			html: this.html
		}
		this.tooltip = this.tooltipService.create(this.tooltipContent, options, this.element);
	}
	ngOnChanges() {

	}
	ngOnDestroy() {
		if (this.tooltip){
			this.tooltip.destroy();
		}
	}

	updateContent() {

	}


}
