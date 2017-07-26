import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
var NzbModalBackdropComponent = (function () {
    function NzbModalBackdropComponent() {
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
        this.visibilityState = 'hidden';
    }
    NzbModalBackdropComponent.prototype.ngOnInit = function () {
        this.visibilityState = 'hidden';
    };
    NzbModalBackdropComponent.prototype.animationDone = function (event) {
        if (event.fromState === 'hidden') {
            if (event.toState === 'shown' || event.toState === 'notShown' || event.toState === 'shownNonAnimated') {
                this.onShown.emit(event);
                return;
            }
        }
        if (event.fromState === 'shown' || event.fromState === 'notShown' || event.fromState === 'shownNonAnimated') {
            if (event.toState === 'hidden') {
                this.onHidden.emit(event);
                return;
            }
        }
    };
    NzbModalBackdropComponent.prototype.show = function () {
        var _this = this;
        var state;
        if (this.options.backdrop) {
            state = this.options.animation ? 'shown' : 'shownNonAnimated';
        }
        else {
            state = 'notShown';
        }
        setTimeout(function () {
            _this.visibilityState = state;
        });
    };
    NzbModalBackdropComponent.prototype.hide = function () {
        var _this = this;
        setTimeout(function () {
            _this.visibilityState = 'hidden';
        });
    };
    NzbModalBackdropComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nzb-modal-backdrop',
                    exportAs: 'nzbModalBackdrop',
                    template: "<div class=\"modal-backdrop\"\n\t\t[@visibilityState]=\"visibilityState\"\n\t\t(@visibilityState.done)=\"animationDone($event)\"\n\t\t></div>",
                    animations: [
                        trigger('visibilityState', [
                            state('hidden', style({
                                opacity: 0,
                                display: 'none'
                            })),
                            state('shown', style({
                                opacity: .5,
                                display: 'block'
                            })),
                            state('notShown', style({
                                opacity: 0,
                                display: 'none'
                            })),
                            state('shownNonAnimated', style({
                                opacity: .5,
                                display: 'block'
                            })),
                            transition('hidden <=> shown', animate('.15s linear')),
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    NzbModalBackdropComponent.ctorParameters = function () { return []; };
    NzbModalBackdropComponent.propDecorators = {
        'options': [{ type: Input },],
        'onShown': [{ type: Output },],
        'onHidden': [{ type: Output },],
    };
    return NzbModalBackdropComponent;
}());
export { NzbModalBackdropComponent };
//# sourceMappingURL=nzb-modal-backdrop.component.js.map