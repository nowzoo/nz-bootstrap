import {
	Injectable,
	ComponentRef,
	ApplicationRef,
	Injector,
	ReflectiveInjector,
	ComponentFactoryResolver
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzbModalComponent } from './modal.component';
import { ModalStatus, ModalEvents } from './constants';
import { IModal, IModalResult, IModalOptions } from './interfaces';



@Injectable()
export class NzbModal implements IModal {

	private modalRef: ComponentRef<NzbModalComponent>;
	private modalInstance: NzbModalComponent;
	constructor(
		private appRef: ApplicationRef,
		private injector: Injector,
		private cfr: ComponentFactoryResolver,
	) {}

	public init(content: any, options: IModalOptions) {
		const modalFactory = this.cfr.resolveComponentFactory(NzbModalComponent);
		const contentInjector = ReflectiveInjector.resolveAndCreate(
			[{provide: NzbModal, useValue: this}], this.injector
		)
		this.modalRef = modalFactory.create(this.injector);
		this.modalInstance = this.modalRef.instance;
		this.modalInstance.modal = this;
		this.modalInstance.options = options;
		this.modalInstance.content = content;
		this.modalInstance.contentInjector = contentInjector;
		this.appRef.attachView(this.modalRef.hostView);
		this.closed()
			.then(() => {
				document.body.removeChild(this.modalRef.location.nativeElement);

				//this.renderer.removeChild('body', this.modalRef.location.nativeElement)
				this.modalRef.destroy();
			})
		document.body.appendChild(this.modalRef.location.nativeElement);
		//this.renderer.appendChild('body', this.modalRef.location.nativeElement)
	}

	public open(){
		return this.modalInstance.open();
	}
	public close(data: any){
		return this.modalInstance.close(data);
	}
	public dismiss(reason: any){
		return this.modalInstance.dismiss(reason);
	}
	public status(): Observable<ModalStatus> {
		return this.modalInstance.status();
	}
	public initialized(): Promise<any> {
		return this.modalInstance.initialized();
	}
	public opened(): Promise<any> {
		return this.modalInstance.opened();
	}
	public closed(): Promise<IModalResult> {
		return this.modalInstance.closed();
	}
}
