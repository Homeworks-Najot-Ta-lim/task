import { ReactNode } from "react";

export interface ModalType {
    title: string;
    open: boolean;
    text?: string;
    onOk?: () => void;
    onCancel?: () => void;
    children?: ReactNode;
    isAlert:boolean;
}
