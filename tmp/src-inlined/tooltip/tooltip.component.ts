import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

declare var jQuery:any;

@Component({
	selector: 'nzb-tooltip-window',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {'[class]': '"tooltip show tooltip-" + placement', 'role': 'tooltip', '[id]': 'id'},
	template: `
		<div class="tooltip-inner"><ng-content></ng-content></div>
	`
})
export class NzbTooltipWindow {
	@Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
	@Input() id: string;
}
