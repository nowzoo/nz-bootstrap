import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, RendererFactory2 } from '@angular/core';
import { NzbPlacements, NzbShowTriggers, NzbHideTriggers, NzbTriggers } from '../shared/constants';
import { NzbTooltipOptions } from './nzb-tooltip-options';
import { NzbTooltip } from './nzb-tooltip';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
var NzbTooltipService = (function () {
    function NzbTooltipService(rendererFactory, appRef, cfr, injector, contentFactory, defaultOptions) {
        this.rendererFactory = rendererFactory;
        this.appRef = appRef;
        this.cfr = cfr;
        this.injector = injector;
        this.contentFactory = contentFactory;
        this.defaultOptions = defaultOptions;
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    NzbTooltipService.prototype.create = function (content, options, target) {
        var instance = new NzbTooltip(this.renderer, this.appRef, this.cfr, this.injector, this.contentFactory);
        var normalized = this.normalizeOptions(options);
        instance.setTooltip(target, content, normalized);
        return instance;
    };
    NzbTooltipService.prototype.normalizeOptions = function (raw) {
        var options = Object.assign({}, this.defaultOptions);
        var value;
        raw = typeof raw === 'object' ? raw : {};
        options.animation = raw.animation !== false;
        value = parseInt(raw.showDelay);
        if (!isNaN(value) && value >= 0) {
            options.showDelay = value;
        }
        value = parseInt(raw.hideDelay);
        if (!isNaN(value) && value >= 0) {
            options.hideDelay = value;
        }
        options.html = raw.html === true;
        if (raw.placement && NzbPlacements[raw.placement]) {
            options.placement = raw.placement;
        }
        value = raw.showTrigger;
        if ('string' === typeof value) {
            value = value.split(/\s+/g);
        }
        if (value instanceof Array) {
            value = value.map(function (str) {
                return str.trim();
            });
            value = value.filter(value, function (str) {
                return NzbShowTriggers.indexOf(str) > -1;
            });
            if (value.includes(NzbTriggers.manual)) {
                options.showTrigger = [NzbTriggers.manual];
            }
            else {
                if (value.includes(NzbTriggers.click)) {
                    options.showTrigger = [NzbTriggers.click];
                }
                else {
                    if (value.length > 0) {
                        options.showTrigger = value;
                    }
                }
            }
        }
        value = raw.hideTrigger;
        if ('string' === typeof value) {
            value = value.split(/\s+/g);
        }
        if (value instanceof Array) {
            value = value.map(function (str) {
                return str.trim();
            });
            value = value.filter(value, function (str) {
                return NzbHideTriggers.indexOf(str) > -1;
            });
            if (value.includes(NzbTriggers.manual)) {
                options.hideTrigger = [NzbTriggers.manual];
            }
            else {
                if (value.includes(NzbTriggers.click)) {
                    options.hideTrigger = [NzbTriggers.click];
                }
                else {
                    if (value.includes(NzbTriggers.focusout)) {
                        options.hideTrigger = [NzbTriggers.focusout];
                    }
                    else {
                        if (value.length > 0) {
                            options.hideTrigger = value;
                        }
                    }
                }
            }
        }
        return options;
    };
    NzbTooltipService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbTooltipService.ctorParameters = function () { return [
        { type: RendererFactory2, },
        { type: ApplicationRef, },
        { type: ComponentFactoryResolver, },
        { type: Injector, },
        { type: NzbContentRefFactoryService, },
        { type: NzbTooltipOptions, },
    ]; };
    return NzbTooltipService;
}());
export { NzbTooltipService };
//# sourceMappingURL=nzb-tooltip.service.js.map