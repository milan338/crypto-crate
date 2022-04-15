import { Fragment } from 'react';
import { HalfFloatType } from 'three';
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize } from 'postprocessing';
import type { Mesh } from 'three';

export type Suns = Array<Mesh | undefined>;
export type Keys = Array<string>;

interface CrateEffectsProps {
    suns: Suns;
    keys: Keys;
}

export default function CrateEffects(props: CrateEffectsProps) {
    const { suns, keys } = props;
    return (
        // Using a HalfFloatType frame buffer fixes color banding
        <EffectComposer frameBufferType={HalfFloatType}>
            {suns.map((sun, i) => {
                // Avoid React keys errors for when sun ref is still undefined
                if (!sun) return <Fragment key={`${keys[i]}-fragment`} />;
                return (
                    <GodRays
                        key={keys[i]}
                        sun={sun}
                        blendFunction={BlendFunction.SCREEN}
                        width={Resizer.AUTO_SIZE}
                        height={Resizer.AUTO_SIZE}
                        kernelSize={KernelSize.SMALL}
                        samples={30}
                        density={0.96}
                        decay={0.9}
                        weight={0.5}
                        exposure={0.4}
                        clampMax={1}
                        blur={1}
                    />
                );
            })}
        </EffectComposer>
    );
}
