import { Component, Renderer2, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import Popper from 'popper.js';
var NzbTooltipComponent = (function () {
    function NzbTooltipComponent(renderer) {
        this.renderer = renderer;
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
        this.tooltipClasses = 'tooltip';
        this.visibilityState = 'gone';
        this.popper = null;
    }
    NzbTooltipComponent.prototype.ngOnInit = function () {
    };
    NzbTooltipComponent.prototype.animationDone = function (event) {
        var _this = this;
        if (event.fromState === 'gone') {
            if (event.toState === 'ready') {
                var state_1 = this.options.animation ? 'shown' : 'shownNonAnimated';
                this.popper.update();
                setTimeout(function () {
                    _this.visibilityState = state_1;
                });
                return;
            }
        }
        if (event.fromState === 'ready') {
            if (event.toState.indexOf('shown') === 0) {
                this.popper.update();
                this.onShown.emit(event);
                return;
            }
            if (event.toState === 'gone') {
                this.onHidden.emit(event);
                return;
            }
        }
        if (event.fromState.indexOf('shown') === 0) {
            if (event.toState === 'ready') {
                setTimeout(function () {
                    _this.visibilityState = 'gone';
                });
                return;
            }
        }
    };
    NzbTooltipComponent.prototype.show = function () {
        var _this = this;
        this.popper = new Popper(this.target.nativeElement, this.tooltipElement.nativeElement, {
            placement: this.options.placement,
            onCreate: function (data) {
                _this.onPopperUpdated(data);
            },
            onUpdate: function (data) {
                _this.onPopperUpdated(data);
            }
        });
        setTimeout(function () {
            _this.visibilityState = 'ready';
        });
    };
    NzbTooltipComponent.prototype.hide = function () {
        var _this = this;
        setTimeout(function () {
            _this.visibilityState = 'ready';
        });
    };
    NzbTooltipComponent.prototype.onPopperUpdated = function (data) {
        this.tooltipClasses = 'tooltip tooltip-' + data.placement;
    };
    NzbTooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nzb-tooltip',
                    template: "\n\t<div [attr.class]=\"tooltipClasses\" role=\"tooltip\"\n\t\t#tooltipElement\n\t\t[@visibilityState]=\"visibilityState\"\n\t\t(@visibilityState.done)=\"animationDone($event)\">\n\t\t<div class=\"tooltip-arrow\"></div>\n\t\t<div class=\"tooltip-inner\"><ng-content></ng-content></div>\n\t</div>\n\t",
                    animations: [
                        trigger('visibilityState', [
                            state('gone', style({
                                display: 'none'
                            })),
                            state('ready', style({
                                opacity: 0,
                                display: 'block'
                            })),
                            state('shown', style({
                                opacity: 1,
                                display: 'block'
                            })),
                            state('shownNonAnimated', style({
                                opacity: 1,
                                display: 'block'
                            })),
                            transition('shown <=> ready', animate('.3s ease-out'))
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    NzbTooltipComponent.ctorParameters = function () { return [
        { type: Renderer2, },
    ]; };
    NzbTooltipComponent.propDecorators = {
        'options': [{ type: Input },],
        'tooltip': [{ type: Input },],
        'target': [{ type: Input },],
        'onShown': [{ type: Output },],
        'onHidden': [{ type: Output },],
        'tooltipElement': [{ type: ViewChild, args: ['tooltipElement',] },],
    };
    return NzbTooltipComponent;
}());
export { NzbTooltipComponent };
//# sourceMappingURL=nzb-tooltip.component.js.map