import { createContext, useReducer } from 'react';
import modalReducer from './modalReducer';
import type { ReactNode } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

export type ModalData = {
    visible: boolean;
    content?: {
        title: string;
        body: ReactNode;
    };
    hudContent?: {
        hudActive: boolean;
        hudBody: ReactNode;
    };
    onBgClick?: () => void;
};
export type ModalState = {
    visible: boolean;
    title: string;
    body: ReactNode;
    hudActive: boolean;
    hudBody: ReactNode;
    onBgClick?: () => void;
};
export type ModalDispatch = (action: ModalData) => void;
export type ModalContextT = { modal: ModalState; dispatchModal: ModalDispatch };

export const ModalContext = createContext<ModalContextT | undefined>(undefined);

export default function ModalProvider(props: ModalProviderProps) {
    const [modal, dispatchModal] = useReducer(modalReducer, {
        visible: false,
        title: '',
        body: '',
        hudActive: false,
        hudBody: '',
    });
    const value = { modal, dispatchModal };
    return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
}
