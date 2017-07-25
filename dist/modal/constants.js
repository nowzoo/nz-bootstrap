export var ModalStatus;
(function (ModalStatus) {
    ModalStatus[ModalStatus["uninitialized"] = 0] = "uninitialized";
    ModalStatus[ModalStatus["opening"] = 1] = "opening";
    ModalStatus[ModalStatus["open"] = 2] = "open";
    ModalStatus[ModalStatus["closing"] = 3] = "closing";
    ModalStatus[ModalStatus["closed"] = 4] = "closed";
})(ModalStatus || (ModalStatus = {}));
export var ModalEvents = {
    show: 'show.bs.modal',
    shown: 'shown.bs.modal',
    hide: 'hide.bs.modal',
    hidden: 'hidden.bs.modal'
};
export var ModalClasses = {
    modal: 'modal',
    modalAnimated: 'modal fade',
    modalDialog: 'modal-dialog',
    modalDialogSm: 'modal-dialog modal-sm',
    modalDialogLg: 'modal-dialog modal-lg',
};
//# sourceMappingURL=constants.js.map