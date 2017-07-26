import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzbSharedModule } from '../shared/nzb-shared.module';
import { NzbTooltipService } from './nzb-tooltip.service';
import { NzbTooltipOptions } from './nzb-tooltip-options';
import { NzbTooltipComponent } from './nzb-tooltip.component';
import { NzbTooltipDirective } from './nzb-tooltip.directive';
var NzbTooltipModule = (function () {
    function NzbTooltipModule() {
    }
    NzbTooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserAnimationsModule,
                        NzbSharedModule
                    ],
                    providers: [
                        NzbTooltipService,
                        NzbTooltipOptions
                    ],
                    declarations: [
                        NzbTooltipDirective,
                        NzbTooltipComponent
                    ],
                    exports: [
                        NzbTooltipDirective
                    ],
                    entryComponents: [
                        NzbTooltipComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    NzbTooltipModule.ctorParameters = function () { return []; };
    return NzbTooltipModule;
}());
export { NzbTooltipModule };
//# sourceMappingURL=nzb-tooltip.module.js.map