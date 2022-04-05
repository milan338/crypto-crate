import { Suspense, useRef } from 'react';
import { Euler } from 'three';
import { useThree } from '@react-three/fiber';
import { useWindowSize } from '@/hooks/window';
import lazyImport from '@/util/lazy_import';
import Crate from '@/components/crate/Crate';
import type { Mesh } from 'three';
import type { CrateRarity } from '@/handlers/crate/crate_handler';

// TODO add option to show extra crates or whatever

// https://github.com/pmndrs/react-postprocessing

// TODO add a strong depth of field effect
// TODO or instead add a fog effect for background crates

// TODO add a suspense like loading animation or something

const CrateEffects = lazyImport(() => import('@/components/crate/CrateEffects'));

interface CrateSceneProps {
    // TODO multiple crates bool here
    center?: [x: number, y: number, z: number];
    lightPosition?: [x: number, y: number, z: number];
    rotation?: Euler;
    responsiveX?: number;
    rarity: CrateRarity; // TODO better handling of rarity
}

// TODO Move suspense and responsive logic out of this component for reusability
export default function CrateScene(props: CrateSceneProps) {
    const sunRef = useRef<Mesh>();
    const [windowW, windowH] = useWindowSize();
    // Allows postprocessing to work on page load ¯\_(ツ)_/¯
    useThree();
    // TODO https://github.com/pmndrs/drei#loading
    const center = props.center ?? [0, 0, 0];
    const lightPosition = props.lightPosition ?? [-2, 10, 4];
    const rotation = props.rotation ?? new Euler(0, 0, 0);
    return (
        <group>
            <Suspense fallback={null}>
                <ambientLight />
                <pointLight position={lightPosition} />
                {/* TODO add order functionality */}
                <Crate
                    position={
                        // TODO fix position not updating when switching between mobile / desktop
                        windowW >= parseInt(process.env.NEXT_PUBLIC_DESKTOP_MIN_WIDTH || '')
                            ? /* eslint-disable indent */
                              // Responsive screen positioning along the x-axis
                              props.responsiveX
                                ? [(windowW / windowH) * props.responsiveX, center[1], center[2]]
                                : center
                            : props.responsiveX
                            ? [
                                  (windowW / windowH) * props.responsiveX * 0.25,
                                  center[1] - 1.68,
                                  center[2] * 1.2,
                              ]
                            : center
                        /* eslint-enable indent */
                    }
                    rotation={
                        // TODO fix rotation not updating when switching between mobile / desktop
                        windowW >= parseInt(process.env.NEXT_PUBLIC_DESKTOP_MIN_WIDTH || '')
                            ? rotation
                            : new Euler(rotation.x - 0.1, rotation.y * 0.5, rotation.z)
                    }
                    rarity={props.rarity}
                    order={0}
                    sunRef={sunRef}
                />
            </Suspense>
            <Suspense fallback={null}>
                {sunRef.current && <CrateEffects sunRef={sunRef.current} />}
            </Suspense>
        </group>
    );
}
