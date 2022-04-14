import { BufferGeometry, Mesh } from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

// Merge multiple of the same mesh into a single mesh with given y rotations
export function mergeRepeatedMeshes(mesh: Mesh, rots: number[]) {
    const geometries = new Array<BufferGeometry>(rots.length);
    for (let i = 0; i < rots.length; i++) {
        geometries[i] = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld).rotateY(rots[i]);
    }
    const merged = mergeBufferGeometries(geometries);
    if (merged === null) throw new Error('Merged mesh is null');
    const mergedMesh = new Mesh(merged);
    mergedMesh.scale.copy(mesh.scale);
    mergedMesh.position.copy(mesh.position);
    return mergedMesh;
}
