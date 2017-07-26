import { Injectable } from '@angular/core';
import { INzbTooltipOptions } from './interfaces';
import { NzbPlacements, NzbTriggers } from '../shared/constants';

@Injectable()
export class NzbTooltipOptions implements INzbTooltipOptions {
	animation 		= true;
	showDelay 		= 0;
	hideDelay 		= 0;
	html 			= false;
	placement 		= NzbPlacements.top;
	showTrigger 	= [NzbTriggers.mousein, NzbTriggers.focus];
	hideTrigger 	= [NzbTriggers.mouseout, NzbTriggers.blur];
}
