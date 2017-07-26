import { NgModule } from '@angular/core';
import { NzbContentRefFactoryService } from './nzb-content-ref-factory.service';
var NzbSharedModule = (function () {
    function NzbSharedModule() {
    }
    NzbSharedModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    providers: [
                        NzbContentRefFactoryService
                    ],
                    declarations: []
                },] },
    ];
    /** @nocollapse */
    NzbSharedModule.ctorParameters = function () { return []; };
    return NzbSharedModule;
}());
export { NzbSharedModule };
//# sourceMappingURL=nzb-shared.module.js.map