import styles from '@/styles/components/scenes/FooterScene.module.scss';
import { useRef, useMemo } from 'react';
import { Vector3, Euler } from 'three';
import { useTransientScroll, useWindowSize } from '@/hooks/window';
import { DESKTOP_MIN_W } from '@/util/constants';
import ContextCanvas from '@/components/canvas/ContextCanvas';
import ExternalButton from '@/components/nav/ExternalButton';
import CrateScene from '../CrateScene';
import Crate from '@/components/crate/Crate';

const FOV = 45;
const CAMERA_POS = new Vector3(0, 0, 0);
const POSITION = new Vector3(-1.45, 0, -12.5);
const ROTATION = new Euler(0, -0.5, 0);
const LIGHT_POS = new Vector3(-2, 10, 4);
const ANIM_START_OFFSET = 400;
const ANIM_OFFSET = 300;
const BASE_H = 977;
const BASE_W = 1980;
const RESPONSIVE_X = 3.5;
const MIN_W_CRATE = 1200;

function translateY(h: number, wH: number, t: number, n: number) {
    return -(
        h *
            (1 +
                0.1 -
                Math.exp(-0.05 * (BASE_H / wH) * ((t - ANIM_OFFSET * n * (wH / BASE_H)) / 20))) -
        200
    );
}

export default function FooterScene() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef1 = useRef<HTMLHeadingElement>(null);
    const contentRef2 = useRef<HTMLHeadingElement>(null);
    const contentRef3 = useRef<HTMLHeadingElement>(null);
    const contentRef4 = useRef<HTMLHeadingElement>(null);
    const contentRef5 = useRef<HTMLDivElement>(null);
    const [wW, wH] = useWindowSize();
    const desktopPos = useMemo(
        () => POSITION.clone().setX((wW / wH) * RESPONSIVE_X + (wW / BASE_W) * POSITION.x),
        [wW, wH]
    );
    useTransientScroll(() => {
        if (
            wrapperRef.current === null ||
            containerRef.current === null ||
            contentRef1.current === null ||
            contentRef2.current === null ||
            contentRef3.current === null ||
            contentRef4.current === null ||
            contentRef5.current === null
        )
            return;
        const boundingRect = wrapperRef.current.getBoundingClientRect();
        const top = boundingRect.top;
        const h = boundingRect.height / 2;
        // Don't update if not in view
        if (top - ANIM_START_OFFSET > h) {
            containerRef.current.style.display = 'none';
            return;
        }
        containerRef.current.style.display = 'block';
        const progress = Math.max(0, h - Math.max(top, -h) + ANIM_START_OFFSET);
        contentRef1.current.style.transform = `translateY(${translateY(h, wH, progress, 1)}px)`;
        contentRef2.current.style.transform = `translateY(${translateY(h, wH, progress, 2)}px)`;
        contentRef3.current.style.transform = `translateY(${translateY(h, wH, progress, 3)}px)`;
        contentRef4.current.style.transform = `translateY(${translateY(h, wH, progress, 4)}px)`;
        contentRef5.current.style.transform = `translateY(${translateY(h, wH, progress, 5)}px)`;
    });
    return (
        <section ref={wrapperRef} id="footer-scene" className={styles.wrapper}>
            <div ref={containerRef} className={styles.container}>
                <h1 ref={contentRef1}>THE FUTURE</h1>
                <h1 ref={contentRef2}>OF NFT</h1>
                <h1 ref={contentRef3}>PLATFORMS IS</h1>
                <h1 ref={contentRef4}>CRYPTOCRATE.</h1>
                <div ref={contentRef5} className={styles.btn}>
                    <ExternalButton className={styles['external-button']} showArrow>
                        Launch App
                    </ExternalButton>
                </div>
            </div>
            <ContextCanvas camera={{ position: CAMERA_POS, fov: FOV }} className={styles.canvas}>
                <CrateScene lightPosition={LIGHT_POS} suns={[]} keys={[]}>
                    {wW >= MIN_W_CRATE && (
                        <Crate
                            position={desktopPos}
                            rotation={ROTATION}
                            scale={1}
                            rarity="epic"
                            noClick
                            noHover
                        />
                    )}
                </CrateScene>
            </ContextCanvas>
        </section>
    );
}
