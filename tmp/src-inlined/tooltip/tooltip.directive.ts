import { Directive, Input, AfterViewInit, OnChanges, ElementRef } from '@angular/core';

declare var jQuery:any;

@Directive({
  selector: '[nzbTooltip]'
})
export class NzbTooltipDirective implements  AfterViewInit {
	@Input() animation: boolean;
	@Input() container: any;
	@Input() delay: number | object;
	@Input() placement: string;
	@Input() trigger: string;
	@Input() constraints: any[];
	@Input() offset: string;
	@Input() tooltipTitle: any;

	constructor(
		private element: ElementRef
	) { }

	ngAfterViewInit() {
		let options = {
			html: true,
			trigger: 'click',
			title: '<div class="nzbTooltipContainer">Some test content</div>'
		}
		jQuery(this.element.nativeElement).tooltip(options);
	}

	ngOnChanges() {

	}

}
