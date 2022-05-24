import { Suspense } from 'react';
import { Vector3 } from 'three';
import lazyImport from '@/util/lazy_import';
import type { ReactNode } from 'react';
import type { Suns, Keys } from '@/components/crate/CrateEffects';

const CrateEffects = lazyImport(() => import('@/components/crate/CrateEffects'));

interface CrateSceneProps {
    suns?: Suns;
    keys?: Keys;
    lightPosition?: Vector3;
    children: ReactNode;
}

const DEFAULT_LIGHT_POS = new Vector3(0, 0, 0);

export default function CrateScene(props: CrateSceneProps) {
    const { suns, keys, children } = props;
    const lightPosition = props.lightPosition ?? DEFAULT_LIGHT_POS;
    return (
        <group>
            <Suspense fallback={null}>
                <ambientLight />
                <pointLight position={lightPosition} />
                {children}
            </Suspense>
            <Suspense fallback={null}>
                {suns && keys && <CrateEffects suns={suns} keys={keys} />}
            </Suspense>
        </group>
    );
}
