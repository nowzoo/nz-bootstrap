import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, RendererFactory2 } from '@angular/core';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
import { NzbModal } from './nzb-modal';
var NzbModalService = (function () {
    function NzbModalService(rendererFactory, appRef, cfr, injector, contentFactory) {
        this.rendererFactory = rendererFactory;
        this.appRef = appRef;
        this.cfr = cfr;
        this.injector = injector;
        this.contentFactory = contentFactory;
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    NzbModalService.prototype.create = function (content, options) {
        var instance = new NzbModal(content, this.normalizeOptions(options), this.renderer, this.appRef, this.cfr, this.injector, this.contentFactory);
        return instance.show();
    };
    NzbModalService.prototype.normalizeOptions = function (raw) {
        raw = 'object' === typeof raw ? raw : {};
        return {
            backdrop: raw.backdrop !== false,
            animation: raw.animation !== false,
            dismissOnBackdropClick: raw.dismissOnBackdropClick !== false,
            dismissOnCancel: raw.dismissOnCancel !== false,
            focusOnShow: raw.focusOnShow !== false,
            size: ['sm', 'lg'].indexOf(raw.size) != -1 ? raw.size : null
        };
    };
    NzbModalService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbModalService.ctorParameters = function () { return [
        { type: RendererFactory2, },
        { type: ApplicationRef, },
        { type: ComponentFactoryResolver, },
        { type: Injector, },
        { type: NzbContentRefFactoryService, },
    ]; };
    return NzbModalService;
}());
export { NzbModalService };
//# sourceMappingURL=nzb-modal.service.js.map