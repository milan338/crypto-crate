import { useMemo, useRef } from 'react';
import { Vector3, Euler, Mesh } from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { useFrame } from '@react-three/fiber';
import { meshBounds } from '@/util/drei/meshBounds';
import { Material, Group, BufferGeometry } from 'three';

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

function mergeCornersMesh(mesh: Mesh) {
    const geometries = new Array<BufferGeometry>(4);
    for (let i = 0; i < 4; i++) {
        geometries[i] = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld).rotateY(ROTS[i]);
    }
    const merged = mergeBufferGeometries(geometries);
    if (merged === null) throw new Error('Corners merged mesh is null');
    const mergedMesh = new Mesh(merged);
    mergedMesh.scale.copy(mesh.scale);
    mergedMesh.position.copy(mesh.position);
    return mergedMesh;
}

export default function CratePart(props: CratePartProps) {
    const { hoverTarget, lerpTime, bodyMesh, cornerMesh, bodyMaterial, cornerMaterial, part } =
        props;
    const ref = useRef<Group>();
    const rotation = useMemo(() => (part === 'top' ? TOP_ROT : BOTTOM_ROT), [part]);
    const corners = useMemo(() => mergeCornersMesh(cornerMesh), [cornerMesh]);
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
