import { ApplicationRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalStatus } from './constants';
import { IModal, IModalResult, IModalOptions } from './interfaces';
export declare class NzbModal implements IModal {
    private appRef;
    private injector;
    private cfr;
    private modalRef;
    private modalInstance;
    constructor(appRef: ApplicationRef, injector: Injector, cfr: ComponentFactoryResolver);
    init(content: any, options: IModalOptions): void;
    open(): void;
    close(data: any): void;
    dismiss(reason: any): void;
    status(): Observable<ModalStatus>;
    initialized(): Promise<any>;
    opened(): Promise<any>;
    closed(): Promise<IModalResult>;
}
