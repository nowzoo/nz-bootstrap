import { NgModule } from '@angular/core';
import { NzbModalService } from './nzb-modal.service';
import { NzbModalComponent } from './nzb-modal.component';
var NzbModalModule = (function () {
    function NzbModalModule() {
    }
    NzbModalModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        NzbModalService
                    ],
                    declarations: [
                        NzbModalComponent
                    ],
                    entryComponents: [
                        NzbModalComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    NzbModalModule.ctorParameters = function () { return []; };
    return NzbModalModule;
}());
export { NzbModalModule };
//# sourceMappingURL=nzb-modal.module.js.map