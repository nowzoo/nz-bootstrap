import { NgModule } from '@angular/core';
import { NzbTooltipDirective } from './tooltip.directive';

@NgModule({
	providers: [],
	declarations: [
		NzbTooltipDirective
	],
	exports: [
		NzbTooltipDirective
	]
})
export class NzbTooltipModule {}
