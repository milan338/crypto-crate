import { useRef } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { meshBounds } from '@/util/drei/meshBounds';
import type { Mesh, Material, Group, Euler } from 'three';

// TODO cut the mesh down into a single corner and clone it

export interface CratePartProps {
    bodyMesh: Mesh;
    bodyMaterial: Material;
    cornersMesh: Mesh;
    cornersMaterial: Material;
    hovered: boolean;
    hoverTarget: Vector3;
    lerpTime: number;
    rotation?: Euler;
}

const REST_TARGET = new Vector3(0, 0, 0);

export default function CratePart(props: CratePartProps) {
    const {
        hoverTarget,
        lerpTime,
        bodyMesh,
        cornersMesh,
        bodyMaterial,
        cornersMaterial,
        rotation,
    } = props;
    const ref = useRef<Group>();
    // Animations
    useFrame(() => {
        if (props.hovered) {
            // Move halves to hovered position
            ref.current?.position.lerp(hoverTarget, lerpTime);
        } else {
            // Move halves to original position
            ref.current?.position.lerp(REST_TARGET, lerpTime);
        }
    });
    return (
        <group ref={ref}>
            {/* Main body */}
            <mesh
                raycast={meshBounds}
                geometry={bodyMesh.geometry}
                scale={bodyMesh.scale}
                material={bodyMaterial}
                rotation={rotation}
            />
            {/* Corners */}
            <mesh
                raycast={meshBounds}
                geometry={cornersMesh.geometry}
                scale={cornersMesh.scale}
                material={cornersMaterial}
                rotation={rotation}
            />
        </group>
    );
}
