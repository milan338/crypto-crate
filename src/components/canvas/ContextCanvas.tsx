import { useContextBridge } from '@/util/drei/useContextBridge';
import { UserContext } from '@/contexts/user/UserProvider';
import { ModalContext } from '@/contexts/modal/ModalProvider';
import SmartCanvas from './SmartCanvas';
import type { SmartCanvasProps } from './SmartCanvas';

// Canvas with modal and crate contexts forwarded
// Must be used within modal and crate context provider
export default function ContextCanvas(props: SmartCanvasProps) {
    const { children, ...canvasProps } = props;
    const ContextBridge = useContextBridge(UserContext, ModalContext);
    return (
        <SmartCanvas {...canvasProps}>
            <ContextBridge>{children}</ContextBridge>
        </SmartCanvas>
    );
}
