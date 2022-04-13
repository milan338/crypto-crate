import styles from '@/styles/components/modal/ModalBg.module.scss';
import { useModal } from '@/hooks/context';
import type { ReactNode } from 'react';

interface ModalBgProps {
    dismissOnBg?: boolean;
    children?: ReactNode;
}

export default function ModalBg(props: ModalBgProps) {
    const { dismissOnBg, children } = props;
    const { modal, dispatchModal } = useModal();
    return (
        <div
            className={`${styles['modal-background']} ${modal.visible ? '' : styles.hidden}`}
            onClick={(event) => {
                event.stopPropagation();
                // Run click callback
                if (modal.onBgClick) modal.onBgClick();
                // Hide modal on clicking background
                if (dismissOnBg) dispatchModal({ visible: false });
            }}
        >
            {children}
        </div>
    );
}
