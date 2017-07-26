import { Injectable } from '@angular/core';
import { NzbPlacements, NzbTriggers } from '../shared/constants';
var NzbTooltipOptions = (function () {
    function NzbTooltipOptions() {
        this.animation = true;
        this.showDelay = 0;
        this.hideDelay = 0;
        this.html = false;
        this.placement = NzbPlacements.top;
        this.showTrigger = [NzbTriggers.mousein, NzbTriggers.focus];
        this.hideTrigger = [NzbTriggers.mouseout, NzbTriggers.blur];
    }
    NzbTooltipOptions.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NzbTooltipOptions.ctorParameters = function () { return []; };
    return NzbTooltipOptions;
}());
export { NzbTooltipOptions };
//# sourceMappingURL=nzb-tooltip-options.js.map