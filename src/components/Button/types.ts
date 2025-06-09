export type ButtonType = 'primary'|'success'|'warning'|'danger'| 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button'|'submit'|'reset'


export interface ButtonProps {
    type?:ButtonType;
    size?:ButtonSize;
    plain?:boolean;
    round?:boolean;
    disable?:boolean;
    circle?:boolean;
    nativeType?:NativeType;
    autofocus?:boolean;
}