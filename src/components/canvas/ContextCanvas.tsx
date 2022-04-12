import { Canvas } from '@react-three/fiber';
import { useContextBridge } from '@/util/drei/useContextBridge';
import { UserContext } from '@/contexts/UserProvider';
import { ModalContext } from '@/contexts/ModalProvider';
import type { Props } from '@react-three/fiber';

// Canvas with modal and crate contexts forwarded
// Must be used within modal and crate context provider
export default function ContextCanvas(props: Props) {
    const ContextBridge = useContextBridge(UserContext, ModalContext);
    return (
        <Canvas {...props}>
            <ContextBridge>{props.children}</ContextBridge>
        </Canvas>
    );
}
