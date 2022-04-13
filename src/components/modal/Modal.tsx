import ModalBg from './parts/ModalBg';
import ModalTextBox from './parts/ModalTextBox';
import ModalHud from './parts/ModalHud';
import { useHasMounted } from '@/hooks/ssr';

export default function Modal() {
    const hasMounted = useHasMounted();
    return (
        <>
            {
                // Prevent showing hiding animation on page load
                hasMounted && (
                    <ModalBg dismissOnBg>
                        <ModalHud />
                        <ModalTextBox />
                    </ModalBg>
                )
            }
        </>
    );
}
