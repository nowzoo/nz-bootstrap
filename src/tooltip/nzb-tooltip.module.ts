import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzbSharedModule } from '../shared/nzb-shared.module';



import { NzbTooltipService } from './nzb-tooltip.service';
import { NzbTooltipOptions } from './nzb-tooltip-options';
import { NzbTooltipComponent } from './nzb-tooltip.component';
import { NzbTooltipDirective } from './nzb-tooltip.directive';


@NgModule({
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
})
export class NzbTooltipModule {}
