import { Directive, ElementRef, Input, ComponentFactoryResolver, TemplateRef, ApplicationRef } from '@angular/core';
var NzbPopoverDirective = (function () {
    function NzbPopoverDirective(element, cfr, appRef) {
        this.element = element;
        this.cfr = cfr;
        this.appRef = appRef;
    }
    NzbPopoverDirective.prototype.ngOnInit = function () {
    };
    NzbPopoverDirective.prototype.ngOnChanges = function () {
        this.updateOptions();
    };
    NzbPopoverDirective.prototype.ngAfterViewInit = function () {
    };
    NzbPopoverDirective.prototype.updateOptions = function () {
        var options = {};
        options.animate = this.animate !== false;
        if (this.container) {
            options.container = this.container;
        }
        else {
            options.container = false;
        }
        if (this.content instanceof TemplateRef) {
            options.content = this.content.elementRef.nativeElement;
        }
        else {
            options.content = this.content;
        }
        console.log(options);
        jQuery(this.element.nativeElement).popover(options);
    };
    NzbPopoverDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nzbPopover]'
                },] },
    ];
    /** @nocollapse */
    NzbPopoverDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ComponentFactoryResolver, },
        { type: ApplicationRef, },
    ]; };
    NzbPopoverDirective.propDecorators = {
        'content': [{ type: Input },],
        'animate': [{ type: Input },],
        'container': [{ type: Input },],
        'delay': [{ type: Input },],
        'popoverTitle': [{ type: Input },],
        'trigger': [{ type: Input },],
    };
    return NzbPopoverDirective;
}());
export { NzbPopoverDirective };
//# sourceMappingURL=popover.directive.js.map