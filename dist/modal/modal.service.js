import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { NzbModal } from './modal';
var NzbModalService = (function () {
    function NzbModalService(appRef, injector, cfr) {
        this.appRef = appRef;
        this.injector = injector;
        this.cfr = cfr;
    }
    NzbModalService.prototype.create = function (content, initialOptions) {
        var options = NzbModalService.normalizeOptions(initialOptions);
        var modal = new NzbModal(this.appRef, this.injector, this.cfr);
        modal.init(content, options);
        return modal;
    };
    NzbModalService.normalizeOptions = function (initialOptions) {
        var options = {
            show: true,
            focus: true,
            keyboard: true,
            backdrop: true,
            animate: true,
            size: '',
            modalClasses: ''
        };
        initialOptions = typeof initialOptions === 'object' ? initialOptions : {};
        options.show = initialOptions.show !== false;
        options.focus = initialOptions.focus !== false;
        options.keyboard = initialOptions.keyboard !== false;
        options.animate = initialOptions.animate !== false;
        if (initialOptions.backdrop === 'static') {
            options.backdrop = initialOptions.backdrop;
        }
        else {
            options.backdrop = initialOptions.backdrop !== false;
        }
        options.size = initialOptions.size;
        options.modalClasses = initialOptions.modalClasses;
        return options;
    };
    NzbModalService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbModalService.ctorParameters = function () { return [
        { type: ApplicationRef, },
        { type: Injector, },
        { type: ComponentFactoryResolver, },
    ]; };
    return NzbModalService;
}());
export { NzbModalService };
//# sourceMappingURL=modal.service.js.map