import styles from '@/styles/components/modal/ModalTextBox.module.scss';
import { useModal } from '@/hooks/context';
import type { ReactNode } from 'react';

interface ModalTextBoxProps {
    children?: ReactNode;
}

export default function ModalTextBox(props: ModalTextBoxProps) {
    const { modal } = useModal();
    const { title, body, visible } = modal;
    console.log(visible);
    return (
        <div
            className={`${styles['modal-textbox']} ${visible ? '' : styles.hidden}`}
            onClick={(event) => event.stopPropagation()}
        >
            <h1>{title}</h1>
            {body}
            {props.children}
        </div>
    );
}
