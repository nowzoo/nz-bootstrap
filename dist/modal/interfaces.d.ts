export interface INzbModalOptions {
    animation?: boolean;
    backdrop?: boolean;
    dismissOnBackdropClick?: boolean;
    dismissOnCancel?: boolean;
    focusOnShow?: boolean;
    size?: 'sm' | 'lg' | null;
}
export interface INzbModalResult {
    dismissed: boolean;
    data: any;
}
