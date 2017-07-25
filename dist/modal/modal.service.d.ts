import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { IModalOptions } from './interfaces';
import { NzbModal } from './modal';
export declare class NzbModalService {
    private appRef;
    private injector;
    private cfr;
    constructor(appRef: ApplicationRef, injector: Injector, cfr: ComponentFactoryResolver);
    create(content: any, initialOptions?: any): NzbModal;
    static normalizeOptions(initialOptions: any): IModalOptions;
}
