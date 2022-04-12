import { useRef } from 'react';
import { Canvas, invalidate, useFrame } from '@react-three/fiber';
import { useIntersectionObserver } from '@/hooks/observer';
import { useHasMounted } from '@/hooks/ssr';
import type { RefObject, RefAttributes, ReactNode } from 'react';
import type { Props } from '@react-three/fiber';

export interface SmartCanvasProps extends Props, RefAttributes<HTMLCanvasElement> {}

interface SmartCanvasHelperProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    children?: ReactNode;
}

function SmartCanvasHelper(props: SmartCanvasHelperProps) {
    const { canvasRef, children } = props;
    const active = useRef(false);
    useIntersectionObserver((event) => {
        if (event.isIntersecting) {
            active.current = true;
            // Resume frameloop when canvas comes back into view
            invalidate();
        } else active.current = false;
    }, canvasRef.current ?? undefined);
    useFrame(() => {
        // Request new frame to be rendered only if in canavs view
        if (active.current) invalidate();
    });
    return <>{children}</>;
}

// R3f canvas that will pause frameloops when out of view
export default function SmartCanvas(props: SmartCanvasProps) {
    const { children, ...canvasProps } = props;
    const ref = useRef<HTMLCanvasElement>(null);
    // Re-render when component mounts and ref exists
    useHasMounted();
    return (
        <Canvas ref={ref} frameloop="demand" {...canvasProps}>
            <SmartCanvasHelper canvasRef={ref}>{children}</SmartCanvasHelper>
        </Canvas>
    );
}
