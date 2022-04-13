import styles from '@/styles/components/modal/ModalHud.module.scss';
import { useModal } from '@/hooks/context';
import type { ReactNode } from 'react';

interface ModalHudProps {
    children?: ReactNode;
}

export default function ModalHud(props: ModalHudProps) {
    const { modal } = useModal();
    const { visible, hudActive, hudBody } = modal;
    return (
        <div className={`${styles['modal-hud']} ${hudActive && visible ? '' : styles.hidden}`}>
            {hudBody}
            {props.children}
        </div>
    );
}
