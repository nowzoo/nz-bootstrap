import {
	Injectable,
	TemplateRef,
	ComponentFactoryResolver,
	ReflectiveInjector,
	Renderer2
} from '@angular/core';
import { NzbContentRef }from './nzb-content-ref';

@Injectable()
export class NzbContentRefFactoryService {

	constructor(
		private cfr: ComponentFactoryResolver
	) { }

	create(
		content:any,
		templateContext: any,
		contentComponenInjector: ReflectiveInjector,
		allowHTML: boolean,
		renderer: Renderer2
	): NzbContentRef {
		console.log(content)
		if (! content) {
			return new NzbContentRef([]);
		}

		if (content instanceof TemplateRef) {
			const viewRef = content.createEmbeddedView(templateContext);
			return new NzbContentRef([viewRef.rootNodes], viewRef);
		}
		if (typeof content === 'string') {
			let el;
			if (allowHTML){
				el = renderer.createElement('div');
				el.innerHTML = content;
				console.log('in helper', el)

			} else {
				el = renderer.createText(content);
				console.log('in helper not allowed', el)
			}
			return new NzbContentRef([[el]]);
		}
		try {
			const componentFactory = this.cfr.resolveComponentFactory(content);
			const componentRef = componentFactory.create(contentComponenInjector);
			return new NzbContentRef(
				[[componentRef.location.nativeElement]],
				componentRef.hostView,
				componentRef
			);
		} catch(e) {
			return new NzbContentRef([]);
		}
	}

}
