import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

type ModalData = {
    visible: boolean;
    content?: {
        title: string;
        body: ReactNode;
    };
    hudContent?: {
        hudActive: boolean;
        hudBody: ReactNode;
    };
};
type ModalState = {
    visible: boolean;
    title: string;
    body: ReactNode;
    hudActive: boolean;
    hudBody: ReactNode;
};
type ModalDispatch = (action: ModalData) => void;
export type ModalContextT = { modal: ModalState; dispatchModal: ModalDispatch };

export const ModalContext = createContext<ModalContextT | undefined>(undefined);

function modalReducer(state: ModalState, data: ModalData): ModalState {
    if (data.visible && data.content === undefined) {
        throw new Error('Modal data must be provided when modal set to visible');
    }
    return { ...state, ...data.content, ...data.hudContent, visible: data.visible };
}

export default function ModalProvider(props: ModalProviderProps) {
    const [modal, dispatchModal] = useReducer(modalReducer, {
        visible: false,
        title: '',
        body: '',
        hudActive: false,
        hudBody: '',
    });
    const value = { modal: modal, dispatchModal };
    return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
}
