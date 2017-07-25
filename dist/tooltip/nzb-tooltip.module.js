import { NgModule } from '@angular/core';
import { NzbTooltipDirective } from './tooltip.directive';
var NzbTooltipModule = (function () {
    function NzbTooltipModule() {
    }
    NzbTooltipModule.decorators = [
        { type: NgModule, args: [{
                    providers: [],
                    declarations: [
                        NzbTooltipDirective
                    ],
                    exports: [
                        NzbTooltipDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    NzbTooltipModule.ctorParameters = function () { return []; };
    return NzbTooltipModule;
}());
export { NzbTooltipModule };
//# sourceMappingURL=nzb-tooltip.module.js.map