import { Component, Input, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
var NzbModalComponent = (function () {
    function NzbModalComponent(renderer) {
        this.renderer = renderer;
        this.onShown = new EventEmitter();
        this.onHidden = new EventEmitter();
        this.visibilityState = 'gone';
        this.dialogClasses = 'modal-dialog';
    }
    NzbModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.onShown.subscribe(function () {
            if (_this.options.focusOnShow) {
                //this.renderer.
                _this.modalElement.nativeElement.focus();
            }
        });
        this.dialogClasses = 'modal-dialog';
        if (['sm', 'lg'].indexOf(this.options.size) !== -1) {
            this.dialogClasses += ' modal-' + this.options.size;
        }
    };
    NzbModalComponent.prototype.animationDone = function (event) {
        var _this = this;
        if (event.fromState === 'gone') {
            if (event.toState === 'ready') {
                var state_1 = this.options.animation ? 'shown' : 'shownNonAnimated';
                setTimeout(function () {
                    _this.visibilityState = state_1;
                });
                return;
            }
        }
        if (event.fromState === 'ready') {
            if (event.toState.indexOf('shown') === 0) {
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
    NzbModalComponent.prototype.show = function () {
        var _this = this;
        setTimeout(function () {
            _this.visibilityState = 'ready';
        });
    };
    NzbModalComponent.prototype.hide = function () {
        var _this = this;
        setTimeout(function () {
            _this.visibilityState = 'ready';
        });
    };
    NzbModalComponent.prototype.backdropClick = function (event) {
        if (this.options.dismissOnBackdropClick && event.target === this.modalElement.nativeElement) {
            this.modal.dismiss('backdropClick');
        }
    };
    NzbModalComponent.prototype.escapeKeyUp = function ($event) {
        if (this.options.dismissOnCancel && event.target === this.modalElement.nativeElement) {
            this.modal.dismiss('escapeKeyUp');
        }
    };
    NzbModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nzb-modal',
                    template: "\n\t\t<div #modalElement\n\t\t\tclass=\"modal\" tabindex=\"-1\" role=\"dialog\" [@modalState]=\"visibilityState\"\n\t\t\t(click)=\"backdropClick($event)\"\n\t\t\t(keyup.esc)=\"escapeKeyUp($event)\">\n\t\t\t<div [ngClass]=\"dialogClasses\" role=\"document\"\n\t\t\t\t[@visibilityState]=\"visibilityState\"\n\t\t\t\t(@visibilityState.done)=\"animationDone($event)\">\n\t\t\t\t<div class=\"modal-content\">\n\t\t\t\t\t<ng-content></ng-content>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
                    animations: [
                        trigger('modalState', [
                            state('gone', style({
                                display: 'none'
                            })),
                            state('ready', style({
                                display: 'block'
                            })),
                            state('shown', style({
                                display: 'block'
                            })),
                            state('shownNonAnimated', style({
                                display: 'block'
                            }))
                        ]),
                        trigger('visibilityState', [
                            state('gone', style({
                                display: 'none'
                            })),
                            state('ready', style({
                                transform: 'translate(0, -100%)',
                                display: 'block'
                            })),
                            state('shown', style({
                                transform: 'translate(0, 0)',
                                display: 'block'
                            })),
                            state('shownNonAnimated', style({
                                transform: 'translate(0, 0)',
                                display: 'block'
                            })),
                            transition('shown <=> ready', animate('.3s ease-out'))
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    NzbModalComponent.ctorParameters = function () { return [
        { type: Renderer2, },
    ]; };
    NzbModalComponent.propDecorators = {
        'options': [{ type: Input },],
        'onShown': [{ type: Output },],
        'onHidden': [{ type: Output },],
        'modalElement': [{ type: ViewChild, args: ['modalElement',] },],
    };
    return NzbModalComponent;
}());
export { NzbModalComponent };
//# sourceMappingURL=nzb-modal.component.js.map