import {
	Renderer2,
	ElementRef
} from '@angular/core';

import { NzbPlacements, NzbShowTriggers, NzbHideTriggers, NzbTriggers } from './constants';
import { INzbPopup } from './interfaces';


export class NzbPopupHelper {

	static initPopupEvents(
		popup: INzbPopup,
		renderer: Renderer2,
		target:ElementRef,
		showTrigger: string[],
		hideTrigger: string[]): any[] {

		const listeners = [];
		const el = target.nativeElement;

		if (showTrigger.indexOf(NzbTriggers.click) > -1 || hideTrigger.indexOf(NzbTriggers.click) > -1){
			listeners.push(renderer.listen(el, 'click', (event) => {
				popup.toggle();
			}));
		}

		if (showTrigger.indexOf(NzbTriggers.focus) > -1){
			listeners.push(renderer.listen(el, 'focus', (event) => {
				popup.show();
			}));
		}
		if (showTrigger.indexOf(NzbTriggers.mousein) > -1){
			listeners.push(renderer.listen(el, 'mouseenter', (event) => {
				popup.show();
			}));
		}
		if (hideTrigger.indexOf(NzbTriggers.blur) > -1){
			listeners.push(renderer.listen(el, 'blur', (event) => {
				popup.hide();
			}));
		}
		if (hideTrigger.indexOf(NzbTriggers.mouseout) > -1){
			listeners.push(renderer.listen(el, 'mouseleave', (event) => {
				popup.hide();
			}));
		}

		return listeners;
	}


}
