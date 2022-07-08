import styles from '@/styles/components/scenes/AboutScene.module.scss';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useCurrentRef } from '@/hooks/ref';
import { useTransientScroll, useWindowSize } from '@/hooks/window';
import { useIntersectionObserver } from '@/hooks/observer';
import { getFastBoundingClientRect } from '@/util/window';
import ContextCanvas from '@/components/canvas/ContextCanvas';
import Crate from '@/components/crate/Crate';
import CrateScene from '../CrateScene';
import type { RefObject } from 'react';
import type { Mesh } from 'three';
import type { CrateControls } from '@/components/crate/Crate';

interface AboutSceneProps {
    homeBgRef: RefObject<HTMLDivElement>;
}

interface AboutSceneHelperProps {
    containerRef: RefObject<HTMLDivElement>;
    wrapperRef: RefObject<HTMLDivElement>;
    overlayRef: RefObject<HTMLDivElement>;
    titleRef: RefObject<HTMLHeadingElement>;
    contentRef: RefObject<HTMLDivElement>;
    homeBgRef: RefObject<HTMLDivElement>;
    bgRef: RefObject<HTMLDivElement>;
    windowW: number;
}

const ROTY_OFFSET = 39.7;
const ROTY_SCALE = 8;
const ROTY_MIN = -12.5 * Math.PI;
const FOV = 45;
const CAMERA_POS = new Vector3(0, 0, 0);
const POSITION = new Vector3(0, -0.3, -12.5);
const LIGHT_POS = new Vector3(-20, 13, 1);
const DEFAULT_CONTROLS: CrateControls = {
    rotY: 0,
    scale: 1.2,
    sphereControls: {
        animIncrement: 0,
    },
};

let hasLoaded = false;
let inView = false;
let forceUpdateCount = 0;
let navbarHeight: number;
let canvasHeight: number;

function setBgOpacity(opacity: number, bg: HTMLElement, homeBg: HTMLElement) {
    bg.style.opacity = `${opacity}`;
    homeBg.style.opacity = `${opacity}`;
}

function AboutSceneHelper(props: AboutSceneHelperProps) {
    const { containerRef, wrapperRef, overlayRef, titleRef, homeBgRef, bgRef } = props;
    const { invalidate } = useThree();
    const [sunRef, onSunRefChange] = useCurrentRef<Mesh>();
    const manualControls = useRef<CrateControls>(DEFAULT_CONTROLS);
    const crateControls = manualControls.current;
    const sphereControls = crateControls.sphereControls;
    // Don't render when not visible
    useIntersectionObserver(
        (event) => (inView = event.isIntersecting),
        containerRef.current ?? undefined
    );
    // Main scroll animation
    const animCb = async () => {
        if (!containerRef.current || !wrapperRef.current || (!inView && forceUpdateCount === 120))
            return;
        // Update scene for some frames while offscreen to prevent crate rotation jank
        if (forceUpdateCount < 120) forceUpdateCount++;
        if (!navbarHeight) navbarHeight = document.getElementById('navbar')?.clientHeight ?? 0;
        if (!canvasHeight) canvasHeight = wrapperRef.current.getBoundingClientRect().height;
        getFastBoundingClientRect(containerRef.current, (boundingRect) => {
            // If top < 0, then |top| is the amount of pixels scrolled into the animation
            // If top > height - navbarHeight, then animation finished
            const top = boundingRect.top - canvasHeight;
            const height = boundingRect.height;
            const progress = Math.min(Math.abs(Math.min(top, 0)), height - navbarHeight) / 300;
            // Update animation
            const rotY = progress / ROTY_SCALE - ROTY_OFFSET;
            crateControls.rotY = Math.min(rotY, ROTY_MIN);
            const scaleProgress = 1 - Math.min(ROTY_MIN + 0.2 + Math.abs(rotY), 0);
            crateControls.scale = Math.exp(0.8 * (scaleProgress - 1));
            sphereControls.animIncrement = Math.max(progress / 3.5 - 1, 0);
            // Update overlay
            if (overlayRef.current && titleRef.current && bgRef.current && homeBgRef.current) {
                // Fade the background
                const fadeProgress = 0.9 * Math.abs(1 - scaleProgress);
                const bgProgress = Math.max(0, progress / 3 - 0.5) * 1.2;
                overlayRef.current.style.opacity = `${fadeProgress}`;
                if (bgProgress >= 0 && bgProgress <= 1)
                    setBgOpacity(bgProgress, bgRef.current, homeBgRef.current);
                // Update variables on page load
                if (!hasLoaded) {
                    hasLoaded = true;
                    setBgOpacity(bgProgress, bgRef.current, homeBgRef.current);
                }
                // Fade the title
                const titleProgress =
                    fadeProgress < 4.5
                        ? Math.max(0, fadeProgress * 1.5 - 0.5)
                        : 1 + 10 * (4.5 - fadeProgress);
                titleRef.current.style.opacity = `${titleProgress}`;
            }
            // Request new frame
            invalidate();
        });
    };
    useTransientScroll(animCb, { throttleMs: 1 });
    return (
        <Suspense fallback={null}>
            <CrateScene lightPosition={LIGHT_POS} suns={[sunRef]} keys={['sun-about']}>
                <Crate
                    position={POSITION}
                    sunRef={onSunRefChange}
                    rarity="rare"
                    manualControls={manualControls.current}
                    noClick
                />
            </CrateScene>
        </Suspense>
    );
}

export default function AboutScene(props: AboutSceneProps) {
    const { homeBgRef } = props;
    const [windowW] = useWindowSize();
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={containerRef} className={styles.container}>
            <div ref={bgRef} className={styles.bg} />
            {/* Main zoom-in crate scene */}
            <div ref={wrapperRef} className={styles['canvas-wrapper']}>
                <ContextCanvas frameloop="demand" camera={{ position: CAMERA_POS, fov: FOV }}>
                    <AboutSceneHelper
                        containerRef={containerRef}
                        wrapperRef={wrapperRef}
                        overlayRef={overlayRef}
                        titleRef={titleRef}
                        contentRef={contentRef}
                        homeBgRef={homeBgRef}
                        bgRef={bgRef}
                        windowW={windowW}
                    />
                </ContextCanvas>
            </div>
            {/* Actual text content */}
            <div ref={overlayRef} className={styles.overlay}>
                <h1 ref={titleRef}>For collectors and creators</h1>
            </div>
        </div>
    );
}
