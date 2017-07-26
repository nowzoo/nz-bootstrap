import { NgModule } from '@angular/core';
import { NzbModalService } from './nzb-modal.service';
import { NzbModalComponent } from './nzb-modal.component';

@NgModule({
	providers: [
		NzbModalService
	],
	declarations: [
		NzbModalComponent
	],
	entryComponents: [
		NzbModalComponent
	]
})
export class NzbModalModule {}
