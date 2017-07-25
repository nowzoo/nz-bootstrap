import {
	Component,
	ElementRef,
	Input,
	OnInit,
	AfterViewInit,
	OnDestroy,
	ViewChild,
	ViewContainerRef,
	TemplateRef,
	ComponentRef,
	ViewRef,
	EmbeddedViewRef,
	ComponentFactoryResolver,
	ReflectiveInjector
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IModalResult, IModalOptions, IModal } from './interfaces';
import { ModalStatus, ModalEvents, ModalClasses } from './constants';

declare var jQuery:any;
declare var Promise;

@Component({
  selector: 'nzb-modal',
  template: `
  		<div #modalElement tabindex="-1" role="dialog">
		    <div #dialogElement role="document">
		        <div class="modal-content"><div #contentElement></div></div>
		    </div>
		</div>
    `
})
export class NzbModalComponent implements  AfterViewInit, OnDestroy, IModal {
	@ViewChild('modalElement') modalElement: ElementRef;
	@ViewChild('dialogElement') dialogElement: ElementRef;
	@ViewChild('contentElement', {read: ViewContainerRef}) contentElement: ViewContainerRef;
	@Input() modal: IModal;
	@Input() options: IModalOptions;
	@Input() content: any;
	@Input() contentInjector: ReflectiveInjector;

	private isViewInitialized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private heightChangeInterval: any;
	private status$: BehaviorSubject<ModalStatus> = new BehaviorSubject(ModalStatus.uninitialized);
	private contentRef: ComponentRef<any> | EmbeddedViewRef<any>;
	private result: IModalResult = null;

	constructor(
		private cfr: ComponentFactoryResolver
	) {}

	ngAfterViewInit() {
		setTimeout(() => {
			this.setup();
		})
	}

	ngOnDestroy() {
		clearInterval(this.heightChangeInterval);
	}

	setup() {
		let el = jQuery(this.modalElement.nativeElement);
		let dialogEl = jQuery(this.dialogElement.nativeElement);
		if (this.options.animate){
			el.addClass(ModalClasses.modalAnimated);
		} else {
			el.addClass(ModalClasses.modal);
		}
		if (this.options.modalClasses){
			el.addClass(this.options.modalClasses);
		}
		switch (this.options.size){
			case 'sm':
				dialogEl.addClass(ModalClasses.modalDialogSm);
				break;
			case 'lg':
				dialogEl.addClass(ModalClasses.modalDialogLg);
				break;
			default:
				dialogEl.addClass(ModalClasses.modalDialog);
				break;
		}

		el.on(ModalEvents.show, (event:Event) => {
			this.status$.next(ModalStatus.opening);
		});
		el.on(ModalEvents.shown, (event:Event) => {
			this.updateOnModalHeightChanged();
			this.heightChangeInterval = setInterval(() => {
				this.updateOnModalHeightChanged();
			}, 250);
			this.status$.next(ModalStatus.open);
		});
		el.on(ModalEvents.hide, (event:Event) => {
			this.status$.next(ModalStatus.closing);
		});
		el.on(ModalEvents.hidden, (event:Event) => {
			clearInterval(this.heightChangeInterval);
			this.status$.next(ModalStatus.closed);
		});
		this.attachContent();
		el.modal(this.options);
		this.isViewInitialized$.next(true);

	}

	private updateOnModalHeightChanged() {
		let el = jQuery(this.modalElement.nativeElement);
		let modal = el.data('bs.modal')
		modal._handleUpdate();

	}

	private attachContent() {
		if (this.content instanceof TemplateRef){
			this.contentRef = this.contentElement.createEmbeddedView(
				this.content,  {modal: this.modal}
			)
		} else {
			this.contentRef = this.contentElement.createComponent(
				this.cfr.resolveComponentFactory(this.content),
				0,
				this.contentInjector
			);
		}
	}


	public open(): void {
		const el = jQuery(this.modalElement.nativeElement);
		el.modal('show');
	}
	public close(data: any): void {
		const el = jQuery(this.modalElement.nativeElement);
		this.result = {cancelled: false, data: data};
		el.modal('hide');
	}
	public dismiss(reason: any): void{
		const el = jQuery(this.modalElement.nativeElement);
		this.result = {cancelled: true, data: reason};
		el.modal('hide');
	}

	public status(): Observable<ModalStatus> {
		return this.status$.asObservable();
	}

	public initialized(): Promise<void> {

		return new Promise((resolve) => {
			let sub = this.isViewInitialized$.subscribe(val => {
				if (val){
					sub.unsubscribe();
					resolve();
				}
			})
		});
	}

	public opened(): Promise<void> {
		return new Promise((resolve, reject) => {
			const sub = this.status$.subscribe(val => {
				console.log(val);
				switch(val){
					case ModalStatus.uninitialized:
					case ModalStatus.opening:
						return;
					case ModalStatus.open:
						sub.unsubscribe();
						return resolve();
					default:
						sub.unsubscribe();
						return reject('already closing or closed');
				}
			});
		});
	}

	closed(): Promise<IModalResult>{
		return new Promise((resolve) => {
			const sub = this.status$.subscribe(val => {
				switch(val){
					case ModalStatus.closed:
						sub.unsubscribe();
						if (! this.result) {
							this.result = {cancelled: true, data: null};
						}
						return resolve(this.result);
					default:
						return;
				}
			});
		});
	}
}
