import {
	Injectable,
	ComponentRef,
	ComponentFactoryResolver,
	Injector,
	ApplicationRef,
	Renderer2,
	ReflectiveInjector
} from '@angular/core';

import { NzbModalBackdropComponent } from './nzb-modal-backdrop.component';
import { NzbModalComponent } from './nzb-modal.component';
import { INzbModalOptions, INzbModalResult } from './interfaces';

import { NzbContentRef } from '../shared/nzb-content-ref';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';


@Injectable()
export class NzbModal {


	private result: INzbModalResult;
	private backdropRef: ComponentRef<NzbModalBackdropComponent> = null;
	private modalRef: ComponentRef<NzbModalComponent> = null;
	private contentRef: NzbContentRef;

	constructor(
		private content: any,
		private options: INzbModalOptions,
		private renderer: Renderer2,
		private appRef: ApplicationRef,
		private cfr: ComponentFactoryResolver,
		private injector: Injector,
		private contentFactory: NzbContentRefFactoryService
	) {}




	show(): Promise<any>{
		return new Promise((resolve) => {
			this.contentRef = this.contentFactory.create(
				this.content,
				{modal: this},
				ReflectiveInjector.resolveAndCreate(
					[{provide: NzbModal,useValue: this}], this.injector
				),
				true,
				this.renderer
			)

			const backdropFactory = this.cfr.resolveComponentFactory(NzbModalBackdropComponent);
			this.backdropRef = backdropFactory.create(this.injector);
			this.backdropRef.instance.options = this.options;
			this.appRef.attachView(this.backdropRef.hostView);

			const modalFactory = this.cfr.resolveComponentFactory(NzbModalComponent);
			this.modalRef = modalFactory.create(this.injector, this.contentRef.nodes);
			this.modalRef.instance.options = this.options;
			this.modalRef.instance.modal = this;
			this.appRef.attachView(this.modalRef.hostView);

			this.renderer.appendChild(document.body, this.backdropRef.location.nativeElement);
			this.renderer.appendChild(document.body, this.modalRef.location.nativeElement);
			this.renderer.addClass(document.body, 'modal-open');
			let s1 = this.backdropRef.instance.onShown.subscribe(() => {

				let s2 = this.modalRef.instance.onShown.subscribe(()=>{
					s2.unsubscribe();
					resolve(this);
				});
				s1.unsubscribe();
				this.modalRef.instance.show();
			});
			this.backdropRef.instance.show();
		})

	}

	private hide(): Promise<INzbModalResult>{
		return new Promise((resolve) => {
			let s1 = this.modalRef.instance.onHidden.subscribe(() => {
				let s2 = this.backdropRef.instance.onHidden.subscribe(()=>{
					s2.unsubscribe();
					this.renderer.removeChild(document.body, this.backdropRef.location.nativeElement);
					this.renderer.removeChild(document.body, this.modalRef.location.nativeElement);
					if (this.contentRef.componentRef){
						this.appRef.detachView(this.contentRef.componentRef.hostView);
						this.contentRef.componentRef.destroy()
					}
					this.appRef.detachView(this.backdropRef.hostView);
					this.appRef.detachView(this.modalRef.hostView);
					this.backdropRef.destroy();
					this.modalRef.destroy();
					this.renderer.removeClass(document.body, 'modal-open');
					if (! this.result){
						this.result = {dismissed: true, data: null};
					}
					resolve(this.result);
				});
				s1.unsubscribe();
				this.backdropRef.instance.hide();
			});
			this.modalRef.instance.hide();
		})

	}

	dismiss(reason?: any): Promise<INzbModalResult> {
		this.result = {dismissed: true, data: reason};
		return this.hide();
	}

	close(data?: any): Promise<INzbModalResult> {
		this.result = {dismissed: false, data: data};
		return this.hide();
	}
}
