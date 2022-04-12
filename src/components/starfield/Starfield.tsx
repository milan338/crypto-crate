import frag from '@/shaders/components/starfield/starfield.frag';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector2, RepeatWrapping, RGBFormat, TextureLoader, ShaderMaterial, Mesh } from 'three';
import { deg2rad } from '@/util/math';
import { useWindowSize } from '@/hooks/window';
import { isServer } from '@/hooks/ssr';

interface StarfieldProps {
    fov: number;
    position: [x: number, y: number, z: number];
}

const noiseTexture = isServer() ? undefined : new TextureLoader().load('/noise.png');
if (noiseTexture) {
    noiseTexture.wrapS = RepeatWrapping;
    noiseTexture.wrapT = RepeatWrapping;
    noiseTexture.format = RGBFormat;
}

const resolution = new Vector2(0, 0);

export default function Starfield(props: StarfieldProps) {
    const ref = useRef<Mesh>();
    const updateMatrix = useRef(true);
    const shaderRef = useRef<ShaderMaterial>();
    const [windowW, windowH] = useWindowSize();
    // Dimensions of the plane such that it fills the canvas
    const { planeW, planeH } = useMemo(() => {
        const fov = deg2rad(props.fov);
        const h = 2 * Math.tan(fov / 2) * Math.abs(props.position[2]);
        const w = h * (windowW / windowH);
        return { planeW: w, planeH: h };
    }, [props.fov, props.position, windowH, windowW]);
    const starfieldShaderMaterial = useMemo(() => {
        resolution.set(windowW, windowH);
        return {
            uniforms: {
                u_time: { value: 3.2 },
                u_shift: { value: 0.15 },
                u_speed: { value: 0.05 },
                u_translatex: { value: 1.55 },
                u_noise: { value: noiseTexture },
                u_resolution: { value: resolution },
            },
            fragmentShader: frag,
        };
    }, [windowW, windowH]);
    useFrame((state) => {
        if (!ref.current || !shaderRef.current) return;
        const time = state.clock.getElapsedTime();
        // Update shader uniforms to progress animation
        shaderRef.current.uniforms.u_time.value = time;
        // Update matrix a single time so the material displays properly
        if (updateMatrix.current) {
            ref.current.updateMatrix();
            updateMatrix.current = false;
        }
    });
    return (
        <mesh ref={ref} position={props.position} matrixAutoUpdate={false}>
            <planeBufferGeometry args={[planeW, planeH]} />
            <shaderMaterial ref={shaderRef} attach="material" args={[starfieldShaderMaterial]} />
        </mesh>
    );
}
