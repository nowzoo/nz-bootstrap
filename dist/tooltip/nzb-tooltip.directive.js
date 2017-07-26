import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NzbTooltipService } from './nzb-tooltip.service';
var NzbTooltipDirective = (function () {
    function NzbTooltipDirective(element, tooltipService, renderer) {
        this.element = element;
        this.tooltipService = tooltipService;
        this.renderer = renderer;
        this.tooltip = null;
    }
    NzbTooltipDirective.prototype.ngAfterViewInit = function () {
        var options = {
            placement: this.placement,
            animation: this.animation,
            showDelay: this.showDelay,
            hideDelay: this.hideDelay,
            html: this.html
        };
        this.tooltip = this.tooltipService.create(this.tooltipContent, options, this.element);
    };
    NzbTooltipDirective.prototype.ngOnChanges = function () {
    };
    NzbTooltipDirective.prototype.ngOnDestroy = function () {
        if (this.tooltip) {
            this.tooltip.destroy();
        }
    };
    NzbTooltipDirective.prototype.updateContent = function () {
    };
    NzbTooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nzbTooltip]'
                },] },
    ];
    /** @nocollapse */
    NzbTooltipDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NzbTooltipService, },
        { type: Renderer2, },
    ]; };
    NzbTooltipDirective.propDecorators = {
        'placement': [{ type: Input },],
        'animation': [{ type: Input },],
        'showDelay': [{ type: Input },],
        'hideDelay': [{ type: Input },],
        'html': [{ type: Input },],
        'tooltipContent': [{ type: Input },],
    };
    return NzbTooltipDirective;
}());
export { NzbTooltipDirective };
//# sourceMappingURL=nzb-tooltip.directive.js.map