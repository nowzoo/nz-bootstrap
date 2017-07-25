import { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NzbModalComponent } from './modal.component';
import { ModalStatus } from './constants';

export interface IModalResult {
	cancelled: boolean;
	data: any;
}

export interface IModalOptions {
	show: boolean,
	focus: boolean;
	keyboard: boolean;
	backdrop: boolean | 'static';
	animate: boolean;
	size: string;
	modalClasses: string;
}

export interface IModal {

	open(): void;
	close(data: any): void;
	dismiss(reason: any): void;
	status(): Observable<ModalStatus>;

	initialized(): Promise<void>;
	opened(): Promise<void>;
	closed(): Promise<IModalResult>;

}
