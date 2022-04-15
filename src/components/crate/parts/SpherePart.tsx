import vert from '@/shaders/crate/sphere_chunk.vert';
import { useRef, useState, useMemo } from 'react';
import {
    BufferAttribute,
    Mesh,
    Vector3,
    Vector2,
    CanvasTexture,
    RepeatWrapping,
    MeshPhysicalMaterial,
} from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';
import CustomShaderMaterial from 'three-custom-shader-material';
import { useFrame } from '@react-three/fiber';
import { meshBounds } from '@/util/drei/meshBounds';
import { getCentroid, vectors3Average } from '@/util/math';
import { mergeRepeatedMeshes } from '@/util/mesh';
import type { MutableRefObject } from 'react';
import type { BufferGeometry, Group } from 'three';
import type { MeshPhysicalMaterialProps } from '@react-three/fiber';
import type CustomShaderMaterialType from 'three-custom-shader-material/vanilla';

export interface SpherePartProps {
    mesh: Mesh;
    color: string;
    nodes: Record<string, Mesh>;
    exploding: boolean;
    setExploding: React.Dispatch<React.SetStateAction<boolean>>;
}

type SphereRef = Group & {
    progress: number;
};

const materialProps: MeshPhysicalMaterialProps = {
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    roughness: 0.3,
    metalness: 0.3,
};

const MAX_EXPLODE_COUNT = 50;
const NORMAL_SCALE = new Vector2(0.15, 0.15);
const ROTS = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

// Get array of sphere chunks for exploded sphere
function mergeSphereChunks(nodes: Record<string, Mesh>) {
    const geometries: BufferGeometry[] = [];
    const positions: Vector3[] = [];
    const scales: Vector3[] = [];
    const directions: number[] = [];
    const randVec = new Vector3().random();
    // Add all individual explosion chunks to geometry array
    for (const [meshName, mesh] of Object.entries(nodes)) {
        if (meshName.includes('SphereVoronoi_cell')) {
            // Loop over the different rotated copies of the sphere
            for (let i = 0; i < ROTS.length; i++) {
                const geometry = mesh.geometry.applyMatrix4(mesh.matrixWorld).rotateY(ROTS[i]);
                geometries.push(geometry);
                positions.push(mesh.position);
                scales.push(mesh.scale);
                const dir = getCentroid(geometry).multiply(randVec.random());
                const nVerts = mesh.geometry.getAttribute('position').count;
                // Push centroid as direction attribute for all vertices of geometry
                for (let j = 0; j < nVerts; j++) {
                    directions.push(dir.x, dir.y, dir.z);
                }
            }
        }
    }
    // Average positions and scale of chunks for final merged geometry
    const pos = vectors3Average(positions);
    const scale = vectors3Average(scales);
    // Create new single mesh from geometries of individual explosion chunks
    // TODO it looks like vertex attributes are also merged, try to undo this?
    const merged = mergeBufferGeometries(geometries);
    if (merged === null) throw new Error('Sphere chunks merged mesh is null');
    const mergedMesh = new Mesh(merged);
    mergedMesh.scale.copy(scale);
    mergedMesh.position.copy(pos);
    const dirs = Float32Array.from(directions);
    mergedMesh.geometry.setAttribute('dir', new BufferAttribute(dirs, 3));
    return mergedMesh;
}

// Update animation progress, reset to 0 if increment is 0
function updateProgress(
    increment: number,
    material: MutableRefObject<CustomShaderMaterialType | undefined>,
    ref: MutableRefObject<SphereRef | undefined>
) {
    if (!ref.current || !material.current) return;
    if (increment === 0) ref.current.progress = 0;
    else ref.current.progress += increment;
    if (material.current) {
        material.current.uniforms.u_progress.value = ref.current.progress;
    }
}

export default function SpherePart(props: SpherePartProps) {
    const { mesh, color, nodes, exploding, setExploding } = props;
    const ref = useRef<SphereRef>();
    const shaderRef = useRef<CustomShaderMaterialType>();
    const [chunksVisible, setChunksVisible] = useState(false);
    // Sphere explosion chunks
    const chunks = useMemo(() => {
        const _chunks = mergeSphereChunks(nodes);
        return mergeRepeatedMeshes(_chunks, ROTS);
    }, [nodes]);
    // Sphere parts
    const spheres = useMemo(() => mergeRepeatedMeshes(mesh, ROTS), [mesh]);
    const sphereTexture = useMemo(() => {
        const texture = new CanvasTexture(new FlakesTexture());
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.x = 10;
        texture.repeat.y = 6;
        return texture;
    }, []);
    const textureProps: MeshPhysicalMaterialProps = useMemo(
        () => ({
            normalMap: sphereTexture,
            normalScale: NORMAL_SCALE,
        }),
        [sphereTexture]
    );
    // Animations
    useFrame(() => {
        if (!ref.current) return;
        if (Number.isNaN(ref.current.progress)) ref.current.progress = 0;
        if (exploding) {
            if (ref.current.progress >= MAX_EXPLODE_COUNT) {
                updateProgress(0, shaderRef, ref);
                setChunksVisible(false);
                setExploding(false);
                return;
            }
            updateProgress(0.1, shaderRef, ref);
            if (!chunksVisible) setChunksVisible(true);
        }
    });

    return (
        <group ref={ref}>
            {/* Main sphere */}
            <mesh
                raycast={meshBounds}
                geometry={spheres.geometry}
                scale={spheres.scale}
                visible={!chunksVisible}
            >
                <meshPhysicalMaterial {...materialProps} {...textureProps} color={color} />
            </mesh>
            {/* Sphere explosion chunks */}
            <mesh
                raycast={() => undefined}
                geometry={chunks.geometry}
                scale={chunks.scale}
                visible={chunksVisible}
            >
                <CustomShaderMaterial
                    ref={shaderRef}
                    baseMaterial={MeshPhysicalMaterial}
                    {...(materialProps as any)} // ¯\_(ツ)_/¯
                    {...textureProps}
                    vertexShader={vert}
                    uniforms={{
                        u_progress: {
                            value: 0,
                        },
                    }}
                    color={color}
                />
            </mesh>
        </group>
    );
}
