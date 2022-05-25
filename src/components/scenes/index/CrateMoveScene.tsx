import { useRef } from 'react';
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useTransientScroll } from '@/hooks/window';
import { useIntersectionObserver } from '@/hooks/observer';
import Crate from '@/components/crate/Crate';
import CrateScene from '../CrateScene';
import type { RefObject } from 'react';
import type { CrateControls } from '@/components/crate/Crate';

interface CrateRotateSceneProps {
    containerRef: RefObject<HTMLDivElement>;
}

const LIGHT_POS = new Vector3(-20, 13, 1);
const POSITION = new Vector3(0, -0.3, -15.5);
const DEFAULT_CONTROLS: CrateControls = {
    rotY: 0,
    scale: 1,
    translateX: 0,
    sphereControls: {
        animIncrement: 0,
    },
};

export default function CrateMoveScene(props: CrateRotateSceneProps) {
    const { containerRef } = props;
    const { invalidate } = useThree();
    const inView = useRef(false);
    const manualControls = useRef<CrateControls>(DEFAULT_CONTROLS);
    const crateControls = manualControls.current;
    // Don't render when not visible
    useIntersectionObserver(
        (event) => (inView.current = event.isIntersecting),
        containerRef.current ?? undefined
    );
    // Main scroll animation
    useTransientScroll(() => {
        if (!containerRef.current || !inView.current) return;
        const top = containerRef.current.getBoundingClientRect().top;
        const progress = Math.max(0, Math.abs(top) / 1000 - 8.1);
        const aspect = window.innerWidth / window.innerHeight;
        const offsetLeft = aspect * 10;
        crateControls.translateX = 11 * aspect * progress - offsetLeft;
        invalidate();
    });
    return (
        <CrateScene lightPosition={LIGHT_POS}>
            {Array.apply(0, Array(5)).map((_, i) => (
                <Crate
                    key={`crate-bw-${i}`}
                    position={POSITION.clone().setX(-8 * i)}
                    rarity="common"
                    manualControls={crateControls}
                    noClick
                    staticOnResize
                />
            ))}
        </CrateScene>
    );
}
