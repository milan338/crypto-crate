import { useState, useRef } from 'react';
import { Canvas, invalidate, useFrame } from '@react-three/fiber';
import { useIntersectionObserver } from '@/hooks/observer';
import { useHasMounted } from '@/hooks/ssr';
import type { RefAttributes, ReactNode } from 'react';
import type { Props } from '@react-three/fiber';

export interface SmartCanvasProps extends Props, RefAttributes<HTMLCanvasElement> {
    frameloopOnDemand?: boolean;
}

interface SmartCanvasHelperProps {
    active: boolean;
    children?: ReactNode;
}

function SmartCanvasHelper(props: SmartCanvasHelperProps) {
    const { active, children } = props;
    invalidate();
    useFrame(() => {
        if (active) invalidate();
    });
    return <>{children}</>;
}

export default function SmartCanvas(props: SmartCanvasProps) {
    const { children, frameloopOnDemand, ...canvasProps } = props;
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLCanvasElement>(null);
    // Re-render when component mounts and ref exists
    useHasMounted();
    useIntersectionObserver((event) => {
        if (event.isIntersecting) setActive(true);
        else setActive(false);
    }, ref.current ?? undefined);
    return (
        <Canvas ref={ref} frameloop="demand" {...canvasProps}>
            <SmartCanvasHelper active={active}>{children}</SmartCanvasHelper>
        </Canvas>
    );
}
