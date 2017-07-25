import { NgModule } from '@angular/core';
import { NzbPopoverDirective } from './popover.directive';

@NgModule({
	providers: [],
	declarations: [
		NzbPopoverDirective
	],
	exports: [
		NzbPopoverDirective
	]
})
export class NzbPopoverModule {}
