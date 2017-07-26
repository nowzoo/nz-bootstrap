import { Injectable, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { NzbContentRef } from './nzb-content-ref';
var NzbContentRefFactoryService = (function () {
    function NzbContentRefFactoryService(cfr) {
        this.cfr = cfr;
    }
    NzbContentRefFactoryService.prototype.create = function (content, templateContext, contentComponenInjector, allowHTML, renderer) {
        console.log(content);
        if (!content) {
            return new NzbContentRef([]);
        }
        if (content instanceof TemplateRef) {
            var viewRef = content.createEmbeddedView(templateContext);
            return new NzbContentRef([viewRef.rootNodes], viewRef);
        }
        if (typeof content === 'string') {
            var el = void 0;
            if (allowHTML) {
                el = renderer.createElement('div');
                el.innerHTML = content;
                console.log('in helper', el);
            }
            else {
                el = renderer.createText(content);
                console.log('in helper not allowed', el);
            }
            return new NzbContentRef([[el]]);
        }
        try {
            var componentFactory = this.cfr.resolveComponentFactory(content);
            var componentRef = componentFactory.create(contentComponenInjector);
            return new NzbContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
        catch (e) {
            return new NzbContentRef([]);
        }
    };
    NzbContentRefFactoryService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbContentRefFactoryService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
    ]; };
    return NzbContentRefFactoryService;
}());
export { NzbContentRefFactoryService };
//# sourceMappingURL=nzb-content-ref-factory.service.js.map