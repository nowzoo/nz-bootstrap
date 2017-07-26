import { NzbTriggers } from './constants';
var NzbPopupHelper = (function () {
    function NzbPopupHelper() {
    }
    NzbPopupHelper.initPopupEvents = function (popup, renderer, target, showTrigger, hideTrigger) {
        var listeners = [];
        var el = target.nativeElement;
        if (showTrigger.indexOf(NzbTriggers.click) > -1 || hideTrigger.indexOf(NzbTriggers.click) > -1) {
            listeners.push(renderer.listen(el, 'click', function (event) {
                popup.toggle();
            }));
        }
        if (showTrigger.indexOf(NzbTriggers.focus) > -1) {
            listeners.push(renderer.listen(el, 'focus', function (event) {
                popup.show();
            }));
        }
        if (showTrigger.indexOf(NzbTriggers.mousein) > -1) {
            listeners.push(renderer.listen(el, 'mouseenter', function (event) {
                popup.show();
            }));
        }
        if (hideTrigger.indexOf(NzbTriggers.blur) > -1) {
            listeners.push(renderer.listen(el, 'blur', function (event) {
                popup.hide();
            }));
        }
        if (hideTrigger.indexOf(NzbTriggers.mouseout) > -1) {
            listeners.push(renderer.listen(el, 'mouseleave', function (event) {
                popup.hide();
            }));
        }
        return listeners;
    };
    return NzbPopupHelper;
}());
export { NzbPopupHelper };
//# sourceMappingURL=nzb-popup-helper.js.map