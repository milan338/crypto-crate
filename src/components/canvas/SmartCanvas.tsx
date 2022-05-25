import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useIntersectionObserver } from '@/hooks/observer';
import type { RefObject, RefAttributes, ReactNode } from 'react';
import type { Props } from '@react-three/fiber';

export interface SmartCanvasProps extends Props, RefAttributes<HTMLCanvasElement> {
    frameloop?: 'always' | 'demand';
}

interface SmartCanvasHelperProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    frameloop?: 'always' | 'demand';
    children?: ReactNode;
}

function SmartCanvasHelper(props: SmartCanvasHelperProps) {
    const { canvasRef, frameloop, children } = props;
    const active = useRef(false);
    const { invalidate } = useThree();
    useIntersectionObserver((event) => {
        if (event.isIntersecting) {
            active.current = true;
            // Resume frameloop when canvas comes back into view
            invalidate();
        } else active.current = false;
    }, canvasRef.current ?? undefined);
    useFrame(() => {
        // Request new frame to be rendered only if in canavs view
        if (active.current && frameloop !== 'demand') invalidate();
    });
    return <>{children}</>;
}

// R3f canvas that will pause frameloops when out of view
export default function SmartCanvas(props: SmartCanvasProps) {
    const { children, frameloop, ...canvasProps } = props;
    const ref = useRef<HTMLCanvasElement>(null);
    return (
        <Canvas ref={ref} frameloop="demand" resize={{ scroll: false }} {...canvasProps}>
            <SmartCanvasHelper canvasRef={ref} frameloop={frameloop}>
                {children}
            </SmartCanvasHelper>
        </Canvas>
    );
}
