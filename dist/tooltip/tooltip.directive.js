import { Directive, Input, ElementRef } from '@angular/core';
var NzbTooltipDirective = (function () {
    function NzbTooltipDirective(element) {
        this.element = element;
    }
    NzbTooltipDirective.prototype.ngAfterViewInit = function () {
        var options = {
            html: true,
            trigger: 'click',
            title: '<div class="nzbTooltipContainer">Some test content</div>'
        };
        jQuery(this.element.nativeElement).tooltip(options);
    };
    NzbTooltipDirective.prototype.ngOnChanges = function () {
    };
    NzbTooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nzbTooltip]'
                },] },
    ];
    /** @nocollapse */
    NzbTooltipDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    NzbTooltipDirective.propDecorators = {
        'animation': [{ type: Input },],
        'container': [{ type: Input },],
        'delay': [{ type: Input },],
        'placement': [{ type: Input },],
        'trigger': [{ type: Input },],
        'constraints': [{ type: Input },],
        'offset': [{ type: Input },],
        'tooltipTitle': [{ type: Input },],
    };
    return NzbTooltipDirective;
}());
export { NzbTooltipDirective };
//# sourceMappingURL=tooltip.directive.js.map