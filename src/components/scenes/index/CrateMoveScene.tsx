import { useRef, useCallback } from 'react';
import { Vector3 } from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useTransientScroll } from '@/hooks/window';
import { useIntersectionObserver } from '@/hooks/observer';
import Crate from '@/components/crate/Crate';
import CrateScene from '../CrateScene';
import type { RefObject } from 'react';
import type { CrateControls } from '@/components/crate/Crate';

interface CrateRotateSceneProps {
    nCrates: number;
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
    const { nCrates, containerRef } = props;
    const { invalidate } = useThree();
    const inView = useRef(false);
    const forceUpdateCount = useRef(0);
    const manualControls = useRef<CrateControls>(DEFAULT_CONTROLS);
    const crateControls = manualControls.current;
    const update = useCallback(
        () => {
            if (!containerRef.current) return;
            const top = containerRef.current.getBoundingClientRect().top;
            const progress = Math.max(0, Math.abs(top) / 1000 - 8.1);
            const aspect = window.innerWidth / window.innerHeight;
            const offsetLeft = aspect * 10.5;
            crateControls.translateX =
                18 *
                    aspect *
                    (1920 / window.innerWidth) *
                    (window.innerWidth < 1300 ? 0.7 : 1) *
                    progress -
                offsetLeft;
            invalidate();
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [containerRef]
    );
    // Don't render when not visible
    useIntersectionObserver(
        (event) => (inView.current = event.isIntersecting),
        containerRef.current ?? undefined
    );
    // Update scene for some frames while offscreen to prevent appearing in the wrong spot
    useFrame(() => {
        if (forceUpdateCount.current === 120) return;
        forceUpdateCount.current++;
        update();
    });
    // Main scroll animation
    useTransientScroll(() => {
        if (!inView.current) return;
        update();
    });
    return (
        <CrateScene lightPosition={LIGHT_POS}>
            {Array.apply(0, Array(nCrates)).map((_, i) => (
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
