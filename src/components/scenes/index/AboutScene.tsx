import styles from '@/styles/components/scenes/AboutScene.module.scss';
import { useRef, Suspense } from 'react';
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useCurrentRef } from '@/hooks/ref';
import { useTransientScroll, useWindowSize } from '@/hooks/window';
import { useHasMounted } from '@/hooks/ssr';
import { useIntersectionObserver } from '@/hooks/observer';
import { setCssVar } from '@/util/style';
import { DESKTOP_MIN_W } from '@/util/constants';
import lazyImport from '@/util/lazy_import';
import ContextCanvas from '@/components/canvas/ContextCanvas';
import Crate from '@/components/crate/Crate';
import CrateScene from '../CrateScene';
import type { RefObject, ReactNode } from 'react';
import type { Mesh } from 'three';
import type { CrateControls } from '@/components/crate/Crate';

const CrateMoveScene = lazyImport(() => import('./CrateMoveScene'));

interface AboutSceneHelperProps {
    containerRef: RefObject<HTMLDivElement>;
    wrapperRef: RefObject<HTMLDivElement>;
    overlayRef: RefObject<HTMLDivElement>;
    titleRef: RefObject<HTMLHeadingElement>;
    contentRef: RefObject<HTMLDivElement>;
    windowW: number;
}

interface AboutScenePProps {
    heading?: string;
    rightAlign?: boolean;
    dummy?: boolean;
    children?: ReactNode;
}

const PROGRESS_SPLIT = 16.5;
const SECTION_1_MAX = 505;
const ROTY_OFFSET = 39.8;
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

let lastN = 0;
let lastSkewI = 0;
let lastSection = 0;
let hasLoaded = false;
let inView = false;
let forceUpdateCount = 0;

function updateSection(newSection: number, overlay: HTMLDivElement) {
    if (newSection === lastSection) return;
    lastSection = newSection;
    overlay.setAttribute('section', newSection.toString());
}

function setBgCol(opacity: number) {
    const theme = document.documentElement.dataset.theme;
    if (theme !== 'dark') setCssVar('col-bg', `rgba(0, 0, 0, ${opacity})`);
}

function AboutSceneHelper(props: AboutSceneHelperProps) {
    const { containerRef, wrapperRef, overlayRef, titleRef, contentRef, windowW } = props;
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
    useTransientScroll(() => {
        if (!containerRef.current || !wrapperRef.current || (!inView && forceUpdateCount === 120))
            return;
        // Update scene for some frames while offscreen to prevent crate rotation jank
        if (forceUpdateCount < 120) forceUpdateCount++;
        const navbarHeight = document.getElementById('navbar')?.clientHeight ?? 0;
        const canvasHeight = wrapperRef.current.getBoundingClientRect().height;
        const boundingRect = containerRef.current.getBoundingClientRect();
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
        sphereControls.animIncrement = Math.max(progress / 3.5 - 1.5, 0);
        // Update overlay
        if (overlayRef.current && titleRef.current && contentRef.current) {
            // Fade the background
            const fadeProgress = 0.9 * Math.abs(1 - scaleProgress);
            const bgProgress = Math.max(0, progress / 3 - 0.5) * 1.2;
            overlayRef.current.style.opacity = `${fadeProgress}`;
            if (bgProgress >= 0 && bgProgress <= 1) setBgCol(bgProgress);
            // Update variables on page load
            if (!hasLoaded) {
                hasLoaded = true;
                setBgCol(bgProgress);
            }
            // Fade the title
            const titleProgress =
                fadeProgress < 4.5
                    ? Math.max(0, fadeProgress * 1.5 - 0.5)
                    : 1 + 10 * (4.5 - fadeProgress);
            titleRef.current.style.opacity = `${titleProgress}`;
            titleRef.current.style.display = titleProgress ? 'flex' : 'none';
            // Set title height
            const twoProgress = Math.max(0, progress - PROGRESS_SPLIT);
            const titleTranslateY = Math.min(twoProgress * 75, canvasHeight / 3.8);
            titleRef.current.style.transform = `translateY(-${titleTranslateY}px)`;
            // Set content height
            const contentProgress = twoProgress * 30;
            contentRef.current.style.transform = `translateY(-${
                windowW >= DESKTOP_MIN_W ? contentProgress : contentProgress * 0.93
            }px)`;
            // Set content styles
            const n = Math.ceil(contentProgress / 115 - 0.9);
            const x = 1 - (n - contentProgress / 115 + 0.9);
            const y = 1 - Math.pow(2 * x - 1, 4);
            contentRef.current.style.opacity = `${y}`;
            // Transition between sections
            updateSection(contentProgress < SECTION_1_MAX ? 0 : 1, overlayRef.current);
            // Set active box visible
            if (n !== lastN) {
                lastN = n;
                // Set all inactive boxes to invisible
                for (let i = 0; i < contentRef.current.children.length; i++)
                    contentRef.current.children[i].setAttribute('visible', 'false');
                try {
                    contentRef.current.children[n - 1].setAttribute('visible', 'true');
                } catch {}
            }
            // Set title skew
            const skewI = Math.ceil(contentProgress / SECTION_1_MAX);
            if (skewI !== lastSkewI) {
                lastSkewI = skewI;
                const skewCollectors = document.getElementById('skew-collectors');
                const skewCreators = document.getElementById('skew-creators');
                const transform = 'skewX(-15deg)';
                if (skewCollectors && skewCreators) {
                    skewCollectors.style.transform = '';
                    skewCreators.style.transform = '';
                    switch (skewI) {
                        case 1:
                            skewCollectors.style.transform = transform;
                            break;
                        case 2:
                            skewCreators.style.transform = transform;
                            break;
                    }
                }
            }
        }
        // Request new frame
        invalidate();
    });
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

function AboutSceneP(props: AboutScenePProps) {
    const { heading, rightAlign, dummy, children } = props;
    return (
        <div
            className={`${styles['content-box']} ${rightAlign ? styles.r : ''}`}
            style={dummy ? { visibility: 'hidden' } : {}}
        >
            <h2>{heading}</h2>
            <p>{children}</p>
        </div>
    );
}

export default function AboutScene() {
    const [windowW] = useWindowSize();
    const hasMounted = useHasMounted();
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={containerRef} className={styles.container}>
            {/* Main zoom-in crate scene */}
            <div ref={wrapperRef} className={styles['canvas-wrapper']}>
                <ContextCanvas frameloop="demand" camera={{ position: CAMERA_POS, fov: FOV }}>
                    <AboutSceneHelper
                        containerRef={containerRef}
                        wrapperRef={wrapperRef}
                        overlayRef={overlayRef}
                        titleRef={titleRef}
                        contentRef={contentRef}
                        windowW={windowW}
                    />
                </ContextCanvas>
            </div>
            {/* Secondary crate scene */}
            <div className={`${styles['canvas-wrapper']} ${styles.secondary}`}>
                <ContextCanvas frameloop="demand" camera={{ position: CAMERA_POS, fov: FOV }}>
                    <Suspense fallback={null}>
                        {windowW >= DESKTOP_MIN_W && (
                            <CrateMoveScene nCrates={4} containerRef={containerRef} />
                        )}
                    </Suspense>
                </ContextCanvas>
            </div>
            {/* Actual text content */}
            <div ref={overlayRef} className={styles.overlay}>
                <h1 ref={titleRef}>
                    For{' '}
                    {windowW >= 600 || !hasMounted ? (
                        <a id="skew-collectors" className={styles.skewed}>
                            collectors
                        </a>
                    ) : (
                        'collectors'
                    )}{' '}
                    and{' '}
                    {windowW >= 600 || !hasMounted ? (
                        <a id="skew-creators" className={styles.skewed}>
                            creators
                        </a>
                    ) : (
                        'creators'
                    )}
                </h1>
                <div ref={contentRef} className={styles['overlay-content']}>
                    {/* Collectors section */}
                    <AboutSceneP heading="Better NFT collection">
                        Bidding drives NFT prices up way too high, leaving the average collector out
                        of luck. CryptoCrate evens the playing field.
                    </AboutSceneP>
                    <AboutSceneP heading="Leave it to luck" rightAlign>
                        CryptoCrate distributes its NFTs randomly - you never know what you&apos;ll
                        get when you open a crate, and it&apos;s totally unpredictable.
                    </AboutSceneP>
                    <AboutSceneP heading="They're just tokens">
                        Each crate is a token on the blockchain. That means you can store them, open
                        them, trade them, or use them in any other CryptoCrate contract functions.
                    </AboutSceneP>
                    {/* Dummy cards for transition padding */}
                    <AboutSceneP dummy />
                    {/* Creators section */}
                    <AboutSceneP heading="Make yourself known" rightAlign>
                        When anyone opens a crate, they&apos;ll have the same chance of finding your
                        work, for both established and up-and-coming creators.
                    </AboutSceneP>
                    <AboutSceneP heading="Get rewarded">
                        Each time your creation is found in a crate, you get a cut of the fees. You
                        also get a portion of the fees whenever you work is traded.
                    </AboutSceneP>
                    <AboutSceneP heading="Removing the hassle" rightAlign>
                        Don&apos;t worry about the underlying implementation - we do all that work
                        behind the scenes for you, so you can focus on what&apos;s important.
                    </AboutSceneP>
                </div>
            </div>
        </div>
    );
}
