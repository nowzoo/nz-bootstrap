import {
	Injectable,
	ComponentFactoryResolver,
	Injector,
	ApplicationRef,
	Renderer2,
	RendererFactory2
} from '@angular/core';


import { INzbModalOptions } from './interfaces';

import { NzbContentRef } from '../shared/nzb-content-ref';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
import { NzbModal } from  './nzb-modal';



@Injectable()
export class NzbModalService {
	private renderer: Renderer2;

	constructor(
		private rendererFactory: RendererFactory2,
		private appRef: ApplicationRef,
		private cfr: ComponentFactoryResolver,
		private injector: Injector,
		private contentFactory: NzbContentRefFactoryService
	) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

	create(content: any, options: any): Promise<any> {
		let instance = new NzbModal(
			content,
			this.normalizeOptions(options),
			this.renderer,
			this.appRef,
			this.cfr,
			this.injector,
			this.contentFactory
		);
		return instance.show();
	}

	normalizeOptions(raw: any): INzbModalOptions {
		raw = 'object' === typeof raw ? raw : {};
		return {
			backdrop: raw.backdrop !== false,
			animation: raw.animation !== false,
			dismissOnBackdropClick: raw.dismissOnBackdropClick  !== false,
			dismissOnCancel: raw.dismissOnCancel !== false,
			focusOnShow: raw.focusOnShow !== false,
			size: ['sm', 'lg'].indexOf(raw.size) != -1 ? raw.size : null
		}
	}

}
