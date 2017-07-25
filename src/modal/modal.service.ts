import {
	ApplicationRef, ComponentFactoryResolver, Renderer2, Injectable, Injector
} from '@angular/core';

import { IModal, IModalOptions } from './interfaces';
import { NzbModal } from './modal';

@Injectable()
export class NzbModalService {

	constructor(
		private appRef: ApplicationRef,
		private injector: Injector,
		private cfr: ComponentFactoryResolver
	) {}

	create(content: any, initialOptions?:any): NzbModal {
		const options = NzbModalService.normalizeOptions(initialOptions);
		const modal = new NzbModal(this.appRef, this.injector, this.cfr);
		modal.init(content, options);
		return modal;
	}

	static normalizeOptions(initialOptions:any): IModalOptions {
		let options:IModalOptions = {
			show: true,
			focus: true,
			keyboard: true,
			backdrop: true,
			animate: true,
			size: '',
			modalClasses: ''
		};
		initialOptions = typeof initialOptions === 'object' ? initialOptions : {};
		options.show = initialOptions.show !== false;
		options.focus = initialOptions.focus !== false;
		options.keyboard = initialOptions.keyboard !== false;
		options.animate = initialOptions.animate !== false;
		if (initialOptions.backdrop === 'static'){
			options.backdrop = initialOptions.backdrop;
		} else {
			options.backdrop = initialOptions.backdrop !== false;
		}
		options.size = initialOptions.size;
		options.modalClasses = initialOptions.modalClasses;
		return options;

	}




}
