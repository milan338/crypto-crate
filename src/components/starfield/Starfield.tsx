import vert from '@/shaders/components/starfield/starfield.vert';
import frag from '@/shaders/components/starfield/starfield.frag';
import { useMemo, useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector2, RepeatWrapping, RGBFormat, TextureLoader, ShaderMaterial } from 'three';
import { deg2rad } from '@/util/math';
import { useWindowSize } from '@/hooks/window';

interface StarfieldProps {
    fov: number;
    position: [x: number, y: number, z: number];
}

export default function Starfield(props: StarfieldProps) {
    const ref = useRef<ShaderMaterial>();
    const [windowW, windowH] = useWindowSize();
    // Dimensions of the plane such that it fills the canvas
    const { planeW, planeH } = useMemo(() => {
        const fov = deg2rad(props.fov);
        const h = 2 * Math.tan(fov / 2) * Math.abs(props.position[2]);
        const w = h * (windowW / windowH);
        return { planeW: w, planeH: h };
    }, [props.fov, props.position, windowH, windowW]);
    // Noise texture used in starfield shader
    const noiseTexture = useMemo(() => {
        const texture = new TextureLoader().load('/noise.png');
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.format = RGBFormat;
        return texture;
    }, []);
    const starfieldShaderMaterial = useMemo(() => {
        // TODO add uniforms to props?
        const shaderMaterial = {
            uniforms: {
                u_time: { value: 3.2 },
                u_shift: { value: 0.15 },
                u_speed: { value: 0.05 },
                u_translatex: { value: 1.55 },
                u_resolution: { value: new Vector2(windowW, windowH) },
                u_noise: { value: noiseTexture },
            },
            vertexShader: vert,
            fragmentShader: frag,
        };
        return shaderMaterial;
    }, [windowW, windowH, noiseTexture]);
    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        // Update shader uniforms to progress animation
        ref.current.uniforms.u_time.value = time;
    });
    return (
        <Suspense fallback={null}>
            <mesh position={props.position}>
                <planeGeometry args={[planeW, planeH]} />
                <shaderMaterial ref={ref} attach="material" args={[starfieldShaderMaterial]} />
            </mesh>
        </Suspense>
    );
}
