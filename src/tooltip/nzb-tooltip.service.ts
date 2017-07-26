import {
	Injectable,
	ComponentFactoryResolver,
	Injector,
	ApplicationRef,
	Renderer2,
	RendererFactory2,
	ElementRef
} from '@angular/core';


import { NzbPlacements, NzbShowTriggers, NzbHideTriggers, NzbTriggers } from '../shared/constants';
import { INzbTooltipOptions } from './interfaces';
import { NzbTooltipOptions } from './nzb-tooltip-options';
import { NzbTooltip } from './nzb-tooltip';
import { NzbContentRef } from '../shared/nzb-content-ref';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';

@Injectable()
export class NzbTooltipService {

	private renderer: Renderer2;

	constructor(
		private rendererFactory: RendererFactory2,
		private appRef: ApplicationRef,
		private cfr: ComponentFactoryResolver,
		private injector: Injector,
		private contentFactory: NzbContentRefFactoryService,
		private defaultOptions: NzbTooltipOptions,

	) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}


	create(content:any, options:any, target: ElementRef): NzbTooltip {
		const instance = new NzbTooltip(
			this.renderer, this.appRef, this.cfr, this.injector, this.contentFactory
		);
		const normalized = this.normalizeOptions(options);
		instance.setTooltip(target, content, normalized);
		return instance;
	}

	private normalizeOptions(raw: any): INzbTooltipOptions {
		let options:INzbTooltipOptions = Object.assign({}, this.defaultOptions);
		let value;
		raw = typeof raw === 'object' ? raw : {};
		options.animation = raw.animation !== false;
		value = parseInt(raw.showDelay);
		if (! isNaN(value) && value >= 0){
			options.showDelay = value;
		}
		value = parseInt(raw.hideDelay);
		if (! isNaN(value) && value >= 0){
			options.hideDelay = value;
		}
		options.html = raw.html === true;
		if ( raw.placement && NzbPlacements[raw.placement]) {
			options.placement = raw.placement;
		}
		value = raw.showTrigger;
		if ('string' === typeof value){
			value = value.split(/\s+/g);
		}
		if (value instanceof Array){
			value = value.map((str: string) =>{
				return str.trim();
			});
			value = value.filter(value, str => {
				return NzbShowTriggers.indexOf(str) > -1;
			});
			if (value.includes(NzbTriggers.manual)){
				options.showTrigger = [NzbTriggers.manual];
			} else {
				if (value.includes(NzbTriggers.click)){
					options.showTrigger = [NzbTriggers.click];
				} else {
					if (value.length > 0){
						options.showTrigger = value;
					}
				}
			}
		}

		value = raw.hideTrigger;
		if ('string' === typeof value){
			value = value.split(/\s+/g);
		}
		if (value instanceof Array){
			value = value.map((str: string) =>{
				return str.trim();
			});
			value = value.filter(value, str => {
				return NzbHideTriggers.indexOf(str) > -1;
			});
			if (value.includes(NzbTriggers.manual)){
				options.hideTrigger = [NzbTriggers.manual];
			} else {
				if (value.includes(NzbTriggers.click)){
					options.hideTrigger = [NzbTriggers.click];
				} else {
					if (value.includes(NzbTriggers.focusout)){
						options.hideTrigger = [NzbTriggers.focusout];
					} else {
						if (value.length > 0){
							options.hideTrigger = value;
						}
					}

				}
			}
		}




		return options;
	}

}
