import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, Renderer2, ReflectiveInjector } from '@angular/core';
import { NzbPopupHelper } from '../shared/nzb-popup-helper';
import { NzbTooltipComponent } from './nzb-tooltip.component';
import { NzbContentRefFactoryService } from '../shared/nzb-content-ref-factory.service';
var NzbTooltip = (function () {
    function NzbTooltip(renderer, appRef, cfr, injector, contentFactory) {
        this.renderer = renderer;
        this.appRef = appRef;
        this.cfr = cfr;
        this.injector = injector;
        this.contentFactory = contentFactory;
        this.isOpen = false;
        this.target = null;
        this.content = null;
        this.options = null;
        this.tooltipRef = null;
        this.contentRef = null;
        this.eventUnsubscribes = null;
        this.targetTitleRemoved = false;
        this.targetAriaLabelAdded = false;
        this.originalTargetTitle = null;
    }
    NzbTooltip.prototype.setTooltip = function (target, content, options) {
        this.options = options;
        this.target = target;
        this.normalizeContentWithTargetTitle(content, target);
        this.resetEvents();
    };
    NzbTooltip.prototype.normalizeContentWithTargetTitle = function (content, target) {
        var title = target.nativeElement.attributes.title;
        var ariaLabel = target.nativeElement.attributes['aria-label'];
        if (title) {
            title = title.value;
            this.originalTargetTitle = title;
            this.renderer.removeAttribute(target.nativeElement, 'title');
            this.targetTitleRemoved = true;
            if (!ariaLabel) {
                this.renderer.setAttribute(target.nativeElement, 'aria-label', title);
                this.targetAriaLabelAdded = true;
            }
            if (!content) {
                this.content = title;
            }
            else {
                this.content = content;
            }
        }
        else {
            if (content) {
                this.content = content;
            }
            else {
                this.content = 'missing valid tooltip content';
            }
        }
    };
    NzbTooltip.prototype.resetEvents = function () {
        this.eventUnsubscribe();
        this.eventUnsubscribes = NzbPopupHelper.initPopupEvents(this, this.renderer, this.target, this.options.showTrigger, this.options.hideTrigger);
    };
    NzbTooltip.prototype.eventUnsubscribe = function () {
        if (this.eventUnsubscribes) {
            this.eventUnsubscribes.forEach(function (unsubscribe) {
                unsubscribe.call();
            });
            this.eventUnsubscribes = null;
        }
    };
    NzbTooltip.prototype.addTooltipComponent = function () {
        this.contentRef = this.contentRef = this.contentFactory.create(this.content, { tooltip: this }, ReflectiveInjector.resolveAndCreate([{ provide: NzbTooltip, useValue: this }], this.injector), this.options.html, this.renderer);
        var tooltipFactory = this.cfr.resolveComponentFactory(NzbTooltipComponent);
        if (this.contentRef.viewRef) {
            this.appRef.attachView(this.contentRef.viewRef);
        }
        this.tooltipRef = tooltipFactory.create(this.injector, this.contentRef.nodes);
        this.tooltipRef.instance.options = this.options;
        this.tooltipRef.instance.tooltip = this;
        this.tooltipRef.instance.target = this.target;
        this.appRef.attachView(this.tooltipRef.hostView);
        this.renderer.appendChild(document.body, this.tooltipRef.location.nativeElement);
    };
    NzbTooltip.prototype.removeTooltipComponent = function () {
        this.renderer.removeChild(document.body, this.tooltipRef.location.nativeElement);
        if (this.contentRef.viewRef) {
            this.appRef.detachView(this.contentRef.viewRef);
        }
        if (this.contentRef.componentRef) {
            this.contentRef.componentRef.destroy();
        }
        this.contentRef = null;
        this.appRef.detachView(this.tooltipRef.hostView);
        this.tooltipRef.destroy();
        this.tooltipRef = null;
    };
    NzbTooltip.prototype.destroy = function () {
        this.eventUnsubscribe();
        this.removeTooltipComponent();
        if (this.target.nativeElement) {
            if (this.targetTitleRemoved) {
                this.renderer.setAttribute(this.target.nativeElement, 'title', this.originalTargetTitle);
                if (this.targetAriaLabelAdded) {
                    this.renderer.removeAttribute(this.target.nativeElement, 'aria-label');
                }
            }
        }
    };
    NzbTooltip.prototype.toggle = function () {
        console.log('toggle called on popup');
    };
    NzbTooltip.prototype.show = function () {
        return this.open();
    };
    NzbTooltip.prototype.hide = function () {
        return this.close();
    };
    NzbTooltip.prototype.open = function () {
        var _this = this;
        var p = new Promise(function (resolve) {
            setTimeout(function () {
                _this.addTooltipComponent();
                var sub = _this.tooltipRef.instance.onShown.subscribe(function () {
                    sub.unsubscribe();
                    resolve(_this);
                });
                _this.tooltipRef.instance.show();
            }, _this.options.showDelay);
        });
        return p;
    };
    NzbTooltip.prototype.close = function () {
        var _this = this;
        var p = new Promise(function (resolve) {
            setTimeout(function () {
                var sub = _this.tooltipRef.instance.onHidden.subscribe(function () {
                    _this.removeTooltipComponent();
                    sub.unsubscribe();
                    resolve(_this);
                });
                _this.tooltipRef.instance.hide();
            }, _this.options.hideDelay);
        });
        return p;
    };
    NzbTooltip.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbTooltip.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ApplicationRef, },
        { type: ComponentFactoryResolver, },
        { type: Injector, },
        { type: NzbContentRefFactoryService, },
    ]; };
    return NzbTooltip;
}());
export { NzbTooltip };
//# sourceMappingURL=nzb-tooltip.js.map