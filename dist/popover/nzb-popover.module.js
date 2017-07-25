import { NgModule } from '@angular/core';
import { NzbPopoverDirective } from './popover.directive';
var NzbPopoverModule = (function () {
    function NzbPopoverModule() {
    }
    NzbPopoverModule.decorators = [
        { type: NgModule, args: [{
                    providers: [],
                    declarations: [
                        NzbPopoverDirective
                    ],
                    exports: [
                        NzbPopoverDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    NzbPopoverModule.ctorParameters = function () { return []; };
    return NzbPopoverModule;
}());
export { NzbPopoverModule };
//# sourceMappingURL=nzb-popover.module.js.map