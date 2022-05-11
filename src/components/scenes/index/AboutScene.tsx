import styles from '@/styles/components/scenes/AboutScene.module.scss';
import { useRef, useEffect } from 'react';
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useCurrentRef } from '@/hooks/ref';
import { setCssVar } from '@/util/style';
import ContextCanvas from '@/components/canvas/ContextCanvas';
import Crate from '@/components/crate/Crate';
import CrateScene from '../CrateScene';
import type { RefObject } from 'react';
import type { Mesh } from 'three';
import type { CrateControls } from '@/components/crate/Crate';

interface AboutSceneHelperProps {
    containerRef: RefObject<HTMLDivElement>;
    wrapperRef: RefObject<HTMLDivElement>;
    overlayRef: RefObject<HTMLDivElement>;
    titleRef: RefObject<HTMLHeadingElement>;
    dummyRef: RefObject<HTMLDivElement>;
}

const PROGRESS_MAX = 18.1;
const ROTY_OFFSET = 39.8;
const ROTY_SCALE = 8;
const ROTY_MIN = -12.5 * Math.PI;
const FOV = 45;
const CAMERA_POS = new Vector3(0, 0, 0);
const POSITION = new Vector3(0, -0.3, -12.5);
const LIGHT_POS = new Vector3(-20, 13, 1);

// TODO about scene crate seems to be constantly running its useframe

function AboutSceneHelper(props: AboutSceneHelperProps) {
    const { containerRef, wrapperRef, overlayRef, titleRef, dummyRef } = props;
    const { invalidate } = useThree();
    const [sunRef, onSunRefChange] = useCurrentRef<Mesh>();
    const manualControls = useRef<CrateControls>({
        rotY: 0,
        scale: 1.2,
        sphereControls: {
            animIncrement: 0,
        },
    });
    const crateControls = manualControls.current;
    const sphereControls = crateControls.sphereControls;

    // TODO make it so that the callback doesn't run if not in view
    // TODO do it with intersection observer?
    useEffect(
        () => {
            const updateAnim = () => {
                if (!containerRef.current || !wrapperRef.current) return;
                const navbarHeight = document.getElementById('navbar')?.clientHeight ?? 0;
                const canvasHeight = wrapperRef.current.getBoundingClientRect().height;
                const boundingRect = containerRef.current.getBoundingClientRect();
                // If top < 0, then |top| is the amount of pixels scrolled into the animation
                // If top > height - navbarHeight, then animation finished
                const top = boundingRect.top - canvasHeight;
                const height = boundingRect.height;
                let progress = Math.min(Math.abs(Math.min(top, 0)), height - navbarHeight) / 300;
                progress = Math.min(progress, PROGRESS_MAX);
                // Update animation
                const rotY = progress / ROTY_SCALE - ROTY_OFFSET;
                crateControls.rotY = Math.min(rotY, ROTY_MIN);
                const scaleProgress = 1 - Math.min(ROTY_MIN + 0.2 + Math.abs(rotY), 0);
                crateControls.scale = Math.exp(0.8 * (scaleProgress - 1));
                sphereControls.animIncrement = Math.max(progress / 3.5 - 1.5, 0);
                // Update overlay
                if (overlayRef.current && titleRef.current && dummyRef.current) {
                    const fadeProgress = 0.9 * Math.abs(1 - scaleProgress);
                    const bgProgress = Math.max(0, progress / 3 - 0.5) * 1.2;
                    const titleProgress = Math.max(0, fadeProgress - 0.5);
                    overlayRef.current.style.opacity = `${fadeProgress}`;
                    titleRef.current.style.opacity = `${titleProgress}`;
                    setCssVar('col-bg', `rgba(0, 0, 0, ${bgProgress})`);
                    // Overlay new dummy container once main finishes scrolling
                    dummyRef.current.style.visibility =
                        progress === PROGRESS_MAX ? 'visible' : 'hidden';

                    dummyRef.current.style.top = `${parseInt(dummyRef.current.style.top) / 10}`;
                }
                // Request new frame
                invalidate();
            };
            window.addEventListener('scroll', updateAnim);
            return () => {
                window.removeEventListener('scroll', updateAnim);
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    return (
        <CrateScene lightPosition={LIGHT_POS} suns={[sunRef]} keys={['sun-about']}>
            <Crate
                position={POSITION}
                sunRef={onSunRefChange}
                rarity="rare"
                manualControls={manualControls.current}
                noClick
            />
        </CrateScene>
    );
}

export default function AboutScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const dummyRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <div ref={containerRef} className={styles.container}>
                <div ref={wrapperRef} className={styles['canvas-wrapper']}>
                    <ContextCanvas frameloop="demand" camera={{ position: CAMERA_POS, fov: FOV }}>
                        <AboutSceneHelper
                            containerRef={containerRef}
                            wrapperRef={wrapperRef}
                            overlayRef={overlayRef}
                            titleRef={titleRef}
                            dummyRef={dummyRef}
                        />
                    </ContextCanvas>
                </div>
                <div ref={overlayRef} className={styles.overlay}>
                    {/* TODO some sort of underline here */}
                    <h1 ref={titleRef}>For creators and collectors</h1>
                </div>
            </div>
            <div ref={dummyRef} className={styles.dummy}>
                <div className={styles['dummy-content']}>
                    <h1>For creators and collectors</h1>
                </div>
            </div>
        </>
    );
}
