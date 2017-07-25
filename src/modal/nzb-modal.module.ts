import { NgModule } from '@angular/core';
import { NzbModalService } from './modal.service';
import { NzbModalComponent } from './modal.component';

@NgModule({
	providers: [NzbModalService],
	declarations: [NzbModalComponent],
	entryComponents: [NzbModalComponent]
})
export class NzbModalModule {}
