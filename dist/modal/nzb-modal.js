import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, Renderer2, ReflectiveInjector } from '@angular/core';
import { NzbModalBackdropComponent } from './nzb-modal-backdrop.component';
import { NzbModalComponent } from './nzb-modal.component';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
var NzbModal = (function () {
    function NzbModal(content, options, renderer, appRef, cfr, injector, contentFactory) {
        this.content = content;
        this.options = options;
        this.renderer = renderer;
        this.appRef = appRef;
        this.cfr = cfr;
        this.injector = injector;
        this.contentFactory = contentFactory;
        this.backdropRef = null;
        this.modalRef = null;
    }
    NzbModal.prototype.show = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.contentRef = _this.contentFactory.create(_this.content, { modal: _this }, ReflectiveInjector.resolveAndCreate([{ provide: NzbModal, useValue: _this }], _this.injector), true, _this.renderer);
            var backdropFactory = _this.cfr.resolveComponentFactory(NzbModalBackdropComponent);
            _this.backdropRef = backdropFactory.create(_this.injector);
            _this.backdropRef.instance.options = _this.options;
            _this.appRef.attachView(_this.backdropRef.hostView);
            var modalFactory = _this.cfr.resolveComponentFactory(NzbModalComponent);
            _this.modalRef = modalFactory.create(_this.injector, _this.contentRef.nodes);
            _this.modalRef.instance.options = _this.options;
            _this.modalRef.instance.modal = _this;
            _this.appRef.attachView(_this.modalRef.hostView);
            _this.renderer.appendChild(document.body, _this.backdropRef.location.nativeElement);
            _this.renderer.appendChild(document.body, _this.modalRef.location.nativeElement);
            _this.renderer.addClass(document.body, 'modal-open');
            var s1 = _this.backdropRef.instance.onShown.subscribe(function () {
                var s2 = _this.modalRef.instance.onShown.subscribe(function () {
                    s2.unsubscribe();
                    resolve(_this);
                });
                s1.unsubscribe();
                _this.modalRef.instance.show();
            });
            _this.backdropRef.instance.show();
        });
    };
    NzbModal.prototype.hide = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var s1 = _this.modalRef.instance.onHidden.subscribe(function () {
                var s2 = _this.backdropRef.instance.onHidden.subscribe(function () {
                    s2.unsubscribe();
                    _this.renderer.removeChild(document.body, _this.backdropRef.location.nativeElement);
                    _this.renderer.removeChild(document.body, _this.modalRef.location.nativeElement);
                    if (_this.contentRef.componentRef) {
                        _this.appRef.detachView(_this.contentRef.componentRef.hostView);
                        _this.contentRef.componentRef.destroy();
                    }
                    _this.appRef.detachView(_this.backdropRef.hostView);
                    _this.appRef.detachView(_this.modalRef.hostView);
                    _this.backdropRef.destroy();
                    _this.modalRef.destroy();
                    _this.renderer.removeClass(document.body, 'modal-open');
                    if (!_this.result) {
                        _this.result = { dismissed: true, data: null };
                    }
                    resolve(_this.result);
                });
                s1.unsubscribe();
                _this.backdropRef.instance.hide();
            });
            _this.modalRef.instance.hide();
        });
    };
    NzbModal.prototype.dismiss = function (reason) {
        this.result = { dismissed: true, data: reason };
        return this.hide();
    };
    NzbModal.prototype.close = function (data) {
        this.result = { dismissed: false, data: data };
        return this.hide();
    };
    NzbModal.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbModal.ctorParameters = function () { return [
        null,
        null,
        { type: Renderer2, },
        { type: ApplicationRef, },
        { type: ComponentFactoryResolver, },
        { type: Injector, },
        { type: NzbContentRefFactoryService, },
    ]; };
    return NzbModal;
}());
export { NzbModal };
//# sourceMappingURL=nzb-modal.js.map