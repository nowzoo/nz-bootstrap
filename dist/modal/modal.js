import { Injectable, ApplicationRef, Injector, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { NzbModalComponent } from './modal.component';
var NzbModal = (function () {
    function NzbModal(appRef, injector, cfr) {
        this.appRef = appRef;
        this.injector = injector;
        this.cfr = cfr;
    }
    NzbModal.prototype.init = function (content, options) {
        var _this = this;
        var modalFactory = this.cfr.resolveComponentFactory(NzbModalComponent);
        var contentInjector = ReflectiveInjector.resolveAndCreate([{ provide: NzbModal, useValue: this }], this.injector);
        this.modalRef = modalFactory.create(this.injector);
        this.modalInstance = this.modalRef.instance;
        this.modalInstance.modal = this;
        this.modalInstance.options = options;
        this.modalInstance.content = content;
        this.modalInstance.contentInjector = contentInjector;
        this.appRef.attachView(this.modalRef.hostView);
        this.closed()
            .then(function () {
            document.body.removeChild(_this.modalRef.location.nativeElement);
            //this.renderer.removeChild('body', this.modalRef.location.nativeElement)
            _this.modalRef.destroy();
        });
        document.body.appendChild(this.modalRef.location.nativeElement);
        //this.renderer.appendChild('body', this.modalRef.location.nativeElement)
    };
    NzbModal.prototype.open = function () {
        return this.modalInstance.open();
    };
    NzbModal.prototype.close = function (data) {
        return this.modalInstance.close(data);
    };
    NzbModal.prototype.dismiss = function (reason) {
        return this.modalInstance.dismiss(reason);
    };
    NzbModal.prototype.status = function () {
        return this.modalInstance.status();
    };
    NzbModal.prototype.initialized = function () {
        return this.modalInstance.initialized();
    };
    NzbModal.prototype.opened = function () {
        return this.modalInstance.opened();
    };
    NzbModal.prototype.closed = function () {
        return this.modalInstance.closed();
    };
    NzbModal.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbModal.ctorParameters = function () { return [
        { type: ApplicationRef, },
        { type: Injector, },
        { type: ComponentFactoryResolver, },
    ]; };
    return NzbModal;
}());
export { NzbModal };
//# sourceMappingURL=modal.js.map