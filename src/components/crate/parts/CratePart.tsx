import { useMemo, useRef } from 'react';
import { Vector3, Euler } from 'three';
import { useFrame } from '@react-three/fiber';
import { meshBounds } from '@/util/drei/meshBounds';
import type { Mesh, Material, Group } from 'three';

// TODO cut the mesh down into a single corner and clone it

export interface CratePartProps {
    bodyMesh: Mesh;
    bodyMaterial: Material;
    cornerMesh: Mesh;
    cornerMaterial: Material;
    hovered: boolean;
    hoverTarget: Vector3;
    lerpTime: number;
    part: 'top' | 'bottom';
}

const REST_TARGET = new Vector3(0, 0, 0);

export default function CratePart(props: CratePartProps) {
    const { hoverTarget, lerpTime, bodyMesh, cornerMesh, bodyMaterial, cornerMaterial, part } =
        props;
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
    const [rot1, rot2, rot3, rot4] = useMemo(() => {
        const z = part === 'bottom' ? 0 : Math.PI;
        return [
            new Euler(0, 0, z),
            new Euler(0, Math.PI / 2, z),
            new Euler(0, Math.PI, z),
            new Euler(0, (3 * Math.PI) / 2, z),
        ];
    }, [part]);
    return (
        <group ref={ref}>
            {/* Main body */}
            <mesh
                raycast={meshBounds}
                geometry={bodyMesh.geometry}
                scale={bodyMesh.scale}
                material={bodyMaterial}
                rotation={rot1}
            />
            {/* Corners */}
            <mesh
                raycast={meshBounds}
                geometry={cornerMesh.geometry}
                scale={cornerMesh.scale}
                material={cornerMaterial}
                rotation={rot1}
            />
            <mesh
                raycast={meshBounds}
                geometry={cornerMesh.geometry}
                scale={cornerMesh.scale}
                material={cornerMaterial}
                rotation={rot2}
            />
            <mesh
                raycast={meshBounds}
                geometry={cornerMesh.geometry}
                scale={cornerMesh.scale}
                material={cornerMaterial}
                rotation={rot3}
            />
            <mesh
                raycast={meshBounds}
                geometry={cornerMesh.geometry}
                scale={cornerMesh.scale}
                material={cornerMaterial}
                rotation={rot4}
            />
        </group>
    );
}
