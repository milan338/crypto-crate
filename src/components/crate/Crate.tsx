import { useLayoutEffect, useRef, useState, useMemo } from 'react';
import { Euler, Quaternion, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@/util/drei/useGLTF';
import { useModal, useUser } from '@/hooks/context';
import { useBeforeUnload } from '@/hooks/window';
import CratePart from './parts/CratePart';
import SpherePart from './parts/SpherePart';
import openCrate from './controller/openCrate';
import type { MutableRefObject } from 'react';
import type { Group, Mesh } from 'three';
import type { CratePartProps } from './parts/CratePart';
import type { SpherePartProps } from './parts/SpherePart';

interface CrateProps {
    rarity: CrateRarity;
    sunRef: MutableRefObject<Mesh | undefined>;
    canOpen?: boolean;
}

type CrateRef = Group & {
    opening: boolean;
    errCounter: number;
    openIntentCounter: number;
    openCounter: number;
};

export const crateRarities = ['common', 'rare', 'epic', 'legendary', 'one-of-a-kind'] as const;
export type CrateRarity = typeof crateRarities[number];

export const cratecolors: Record<CrateRarity, string> = {
    common: 'grey',
    rare: 'teal',
    epic: 'purple',
    legendary: 'goldenrod',
    'one-of-a-kind': 'rgb',
};

const OPEN_TIME = 100;
const OPEN_INTENT_TIME = 60;
const ERR_TIME = 37;
const LERP_TIME = 0.08;

const CRATE_HOVER_TARGET = new Vector3(0, 0, 0);
const CRATE_TOP_OFFSET = new Vector3(0, 0.1, 0);
const CRATE_BOTTOM_OFFSET = CRATE_TOP_OFFSET.clone().multiplyScalar(-1);

const rotation = new Quaternion();
const rotationEuler = new Euler();
const position = new Vector3();

export default function Crate(props: JSX.IntrinsicElements['group'] & CrateProps) {
    const { rarity, sunRef, canOpen, ...groupProps } = props;
    const ref = useRef<CrateRef>();
    const initState = useRef<Group | undefined>(undefined);
    const { dispatchModal } = useModal();
    const { user } = useUser();
    const [disableReload, enableReload] = useBeforeUnload('');
    const { nodes, materials } = useGLTF('/models/crate_basic.gltf');
    const [hovered, setHovered] = useState(false);
    const [exploding, setExploding] = useState(false);
    const [opening, setOpening] = useState(false);
    // Update 'initial' state whenever the window is resized to prevent crate drifting
    // * This might break with moving crates around in future
    useLayoutEffect(() => {
        const resizeCrateListener = () => {
            // Ensure higher order components using useWindowSize have had their window event listeners already called
            setTimeout(() => {
                if (!ref.current || !initState.current) return;
                initState.current.position.set(
                    ref.current.position.x,
                    initState.current.position.y,
                    initState.current.position.z
                );
            }, 100);
        };
        window.addEventListener('resize', resizeCrateListener);
        return () => {
            window.removeEventListener('resize', resizeCrateListener);
        };
    }, []);
    // Animations
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (!ref.current) return;
        if (initState.current === undefined) initState.current = ref.current.clone();
        // Hover-in-place animation
        rotationEuler.x = initState.current.rotation.x + Math.cos(time) * 0.04;
        rotationEuler.y = initState.current.rotation.y + Math.sin(time / 2) * 0.05;
        rotation.setFromEuler(rotationEuler);
        ref.current.position.y = initState.current.position.y + Math.sin(time) * 0.1;
        if (!opening) {
            // In error animation state
            if (ref.current.errCounter) {
                ref.current.position.x = initState.current.position.x + Math.sin(time * 37) * 0.08;
                ref.current.errCounter--;
            } else {
                // Return crate to resting x-coordinate
                position.set(
                    initState.current.position.x,
                    ref.current.position.y,
                    ref.current.position.z
                );
                ref.current.position.lerp(position, LERP_TIME * 0.01);
                // Crate idle rotation animation - only play when not animating explosion
                ref.current.quaternion.slerp(rotation, LERP_TIME * 0.8);
            }
        } else {
            if (ref.current.openIntentCounter) {
                // Pre-explosion animation
                ref.current.position.x = initState.current.position.x + Math.sin(time * 37) * 0.01;
                ref.current.rotation.y = initState.current.rotation.y + Math.sin(time * 37) * 0.02;
                ref.current.rotation.z = initState.current.rotation.z + Math.cos(time * 37) * 0.02;
                ref.current.openIntentCounter--;
                // Begin explosion animation after pre-animation is complete
                if (ref.current.openIntentCounter <= OPEN_INTENT_TIME * 0.4) {
                    setExploding(true);
                }
            } else {
                enableReload();
                // TODO tmp; remove this later and deal with it properly
                setOpening(false);
            }
        }
    });
    // Universal children properties
    const crateProps: Omit<CratePartProps, 'part'> = useMemo(
        () => ({
            bodyMesh: nodes.BodyHalf,
            bodyMaterial: materials.BodyMaterial,
            cornerMesh: nodes.Corner,
            cornerMaterial: materials.CornerMaterial,
            hovered: hovered,
            hoverTarget: CRATE_HOVER_TARGET,
            lerpTime: LERP_TIME,
        }),
        [hovered, materials.BodyMaterial, materials.CornerMaterial, nodes.BodyHalf, nodes.Corner]
    );
    const sphereProps: SpherePartProps = useMemo(
        () => ({
            mesh: nodes.Sphere,
            color: cratecolors[rarity],
            nodes: nodes,
            exploding: exploding,
            setExploding: setExploding,
        }),
        [exploding, nodes, rarity]
    );
    return (
        <group
            {...groupProps}
            ref={ref}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={(event) => {
                // Prevent raycaster from triggering multiple click events
                event.stopPropagation();
                // if (opening || exploding || !canOpen || !ref.current) return;
                if (opening || exploding || !ref.current) return;
                // Disable page reloads
                disableReload();
                // Attempt opening the crate
                const err = openCrate(user, dispatchModal, rarity, ERR_TIME * 2, enableReload);
                // Error animation
                if (err) ref.current.errCounter = ERR_TIME;
            }}
            // TODO remove
            onDoubleClick={(event) => {
                event.stopPropagation();
                if (opening || exploding) return;
                setOpening(true);
                // setExploding(true);
                if (ref.current) {
                    ref.current.openIntentCounter = OPEN_INTENT_TIME;
                }
            }}
        >
            {/* Crate body */}
            <CratePart {...crateProps} hoverTarget={CRATE_TOP_OFFSET} part="top" />
            <CratePart {...crateProps} hoverTarget={CRATE_BOTTOM_OFFSET} part="bottom" />
            {/* Crate spheres */}
            <SpherePart {...sphereProps} />
            {/* Central glowing sphere */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[2.1, 20, 20]} />
                <meshBasicMaterial color={cratecolors[rarity]} />
            </mesh>
        </group>
    );
}

// useGLTF.preload(crateModelPath);
