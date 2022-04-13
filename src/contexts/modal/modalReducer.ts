import type { ModalData, ModalState } from './ModalProvider';

export default function modalReducer(state: ModalState, data: ModalData): ModalState {
    if (data.visible && data.content === undefined) {
        throw new Error('Modal data must be provided when modal set to visible');
    }
    const { visible, content, hudContent, onBgClick } = data;
    return {
        ...state,
        ...content,
        ...hudContent,
        visible,
        onBgClick,
    };
}
