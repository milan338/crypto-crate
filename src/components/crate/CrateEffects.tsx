import { HalfFloatType } from 'three';
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize } from 'postprocessing';
import type { Mesh } from 'three';

interface CrateEffectsProps {
    sunRef: Mesh;
}

export default function CrateEffects(props: CrateEffectsProps) {
    return (
        // Using a HalfFloatType frame buffer fixes color banding
        <EffectComposer frameBufferType={HalfFloatType}>
            <GodRays
                sun={props.sunRef}
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
        </EffectComposer>
    );
}
