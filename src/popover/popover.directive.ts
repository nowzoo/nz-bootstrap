import {
	Directive,
	OnInit,
	OnChanges,
	AfterViewInit,
	ElementRef,
	Input,
	ComponentFactoryResolver,
	TemplateRef,
	ApplicationRef
} from '@angular/core';

import Tether from 'tether';

declare var jQuery:any;

@Directive({
  selector: '[nzbPopover]'
})
export class NzbPopoverDirective implements OnInit, OnChanges,  AfterViewInit {
	@Input() content: any;
	@Input() animate: boolean;
	@Input() container: false|string;
	@Input() delay: number|object;
	@Input() popoverTitle: string;
	@Input() trigger: any;

	public options: any;
	constructor(
		private element: ElementRef,
		private cfr: ComponentFactoryResolver,
		private appRef: ApplicationRef
	) { }

	ngOnInit() {

	}

	ngOnChanges() {
		this.updateOptions();
	}

	ngAfterViewInit() {

	}



	updateOptions() {
		let options: any = {};
		options.animate = this.animate !== false;
		if (this.container){
			options.container = this.container;
		} else {
			options.container = false
		}

		if (this.content instanceof TemplateRef){
			options.content = this.content.elementRef.nativeElement;
		} else {
			options.content = this.content;
		}
		console.log(options);
		jQuery(this.element.nativeElement).popover(options);
	}

}
