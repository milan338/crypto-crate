import { useMemo, useRef } from 'react';
import { Vector3, Euler } from 'three';
import { useFrame } from '@react-three/fiber';
import { meshBounds } from '@/util/drei/meshBounds';
import { mergeRepeatedMeshes } from '@/util/mesh';
import { Mesh, Material, Group } from 'three';

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
const ROTS = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
const TOP_ROT = new Euler(0, 0, Math.PI);
const BOTTOM_ROT = new Euler(0, 0, 0);

export default function CratePart(props: CratePartProps) {
    const { hoverTarget, lerpTime, bodyMesh, cornerMesh, bodyMaterial, cornerMaterial, part } =
        props;
    const ref = useRef<Group>();
    const rotation = useMemo(() => (part === 'top' ? TOP_ROT : BOTTOM_ROT), [part]);
    const corners = useMemo(() => mergeRepeatedMeshes(cornerMesh, ROTS), [cornerMesh]);
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
                raycast={() => undefined}
                geometry={corners.geometry}
                scale={corners.scale}
                rotation={rotation}
                material={cornerMaterial}
            />
        </group>
    );
}
