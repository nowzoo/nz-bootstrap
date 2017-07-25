
export enum ModalStatus {
	uninitialized,
	opening,
	open,
	closing,
	closed
}

export const ModalEvents = {
	show: 'show.bs.modal',
	shown: 'shown.bs.modal',
	hide: 'hide.bs.modal',
	hidden: 'hidden.bs.modal'
}

export const ModalClasses = {
	modal: 'modal',
	modalAnimated: 'modal fade',
	modalDialog: 'modal-dialog',
	modalDialogSm: 'modal-dialog modal-sm',
	modalDialogLg: 'modal-dialog modal-lg',
}
