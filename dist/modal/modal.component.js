import { Component, Input, ViewChild, ViewContainerRef, TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalStatus, ModalEvents, ModalClasses } from './constants';
var NzbModalComponent = (function () {
    function NzbModalComponent(cfr) {
        this.cfr = cfr;
        this.isViewInitialized$ = new BehaviorSubject(false);
        this.status$ = new BehaviorSubject(ModalStatus.uninitialized);
        this.result = null;
    }
    NzbModalComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setup();
        });
    };
    NzbModalComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.heightChangeInterval);
    };
    NzbModalComponent.prototype.setup = function () {
        var _this = this;
        var el = jQuery(this.modalElement.nativeElement);
        var dialogEl = jQuery(this.dialogElement.nativeElement);
        if (this.options.animate) {
            el.addClass(ModalClasses.modalAnimated);
        }
        else {
            el.addClass(ModalClasses.modal);
        }
        if (this.options.modalClasses) {
            el.addClass(this.options.modalClasses);
        }
        switch (this.options.size) {
            case 'sm':
                dialogEl.addClass(ModalClasses.modalDialogSm);
                break;
            case 'lg':
                dialogEl.addClass(ModalClasses.modalDialogLg);
                break;
            default:
                dialogEl.addClass(ModalClasses.modalDialog);
                break;
        }
        el.on(ModalEvents.show, function (event) {
            _this.status$.next(ModalStatus.opening);
        });
        el.on(ModalEvents.shown, function (event) {
            _this.updateOnModalHeightChanged();
            _this.heightChangeInterval = setInterval(function () {
                _this.updateOnModalHeightChanged();
            }, 250);
            _this.status$.next(ModalStatus.open);
        });
        el.on(ModalEvents.hide, function (event) {
            _this.status$.next(ModalStatus.closing);
        });
        el.on(ModalEvents.hidden, function (event) {
            clearInterval(_this.heightChangeInterval);
            _this.status$.next(ModalStatus.closed);
        });
        this.attachContent();
        el.modal(this.options);
        this.isViewInitialized$.next(true);
    };
    NzbModalComponent.prototype.updateOnModalHeightChanged = function () {
        var el = jQuery(this.modalElement.nativeElement);
        var modal = el.data('bs.modal');
        modal._handleUpdate();
    };
    NzbModalComponent.prototype.attachContent = function () {
        if (this.content instanceof TemplateRef) {
            this.contentRef = this.contentElement.createEmbeddedView(this.content, { modal: this.modal });
        }
        else {
            this.contentRef = this.contentElement.createComponent(this.cfr.resolveComponentFactory(this.content), 0, this.contentInjector);
        }
    };
    NzbModalComponent.prototype.open = function () {
        var el = jQuery(this.modalElement.nativeElement);
        el.modal('show');
    };
    NzbModalComponent.prototype.close = function (data) {
        var el = jQuery(this.modalElement.nativeElement);
        this.result = { cancelled: false, data: data };
        el.modal('hide');
    };
    NzbModalComponent.prototype.dismiss = function (reason) {
        var el = jQuery(this.modalElement.nativeElement);
        this.result = { cancelled: true, data: reason };
        el.modal('hide');
    };
    NzbModalComponent.prototype.status = function () {
        return this.status$.asObservable();
    };
    NzbModalComponent.prototype.initialized = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var sub = _this.isViewInitialized$.subscribe(function (val) {
                if (val) {
                    sub.unsubscribe();
                    resolve();
                }
            });
        });
    };
    NzbModalComponent.prototype.opened = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sub = _this.status$.subscribe(function (val) {
                console.log(val);
                switch (val) {
                    case ModalStatus.uninitialized:
                    case ModalStatus.opening:
                        return;
                    case ModalStatus.open:
                        sub.unsubscribe();
                        return resolve();
                    default:
                        sub.unsubscribe();
                        return reject('already closing or closed');
                }
            });
        });
    };
    NzbModalComponent.prototype.closed = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var sub = _this.status$.subscribe(function (val) {
                switch (val) {
                    case ModalStatus.closed:
                        sub.unsubscribe();
                        if (!_this.result) {
                            _this.result = { cancelled: true, data: null };
                        }
                        return resolve(_this.result);
                    default:
                        return;
                }
            });
        });
    };
    NzbModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nzb-modal',
                    template: "\n  \t\t<div #modalElement tabindex=\"-1\" role=\"dialog\">\n\t\t    <div #dialogElement role=\"document\">\n\t\t        <div class=\"modal-content\"><div #contentElement></div></div>\n\t\t    </div>\n\t\t</div>\n    "
                },] },
    ];
    /** @nocollapse */
    NzbModalComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
    ]; };
    NzbModalComponent.propDecorators = {
        'modalElement': [{ type: ViewChild, args: ['modalElement',] },],
        'dialogElement': [{ type: ViewChild, args: ['dialogElement',] },],
        'contentElement': [{ type: ViewChild, args: ['contentElement', { read: ViewContainerRef },] },],
        'modal': [{ type: Input },],
        'options': [{ type: Input },],
        'content': [{ type: Input },],
        'contentInjector': [{ type: Input },],
    };
    return NzbModalComponent;
}());
export { NzbModalComponent };
//# sourceMappingURL=modal.component.js.map