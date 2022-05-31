import { Vector3 } from 'three';
import type { BufferGeometry } from 'three';

// Convert degrees to radians
export function deg2rad(theta: number) {
    return theta * (Math.PI / 180);
}

// Calculate the centroid of a geometry
export function getCentroid(geometry: BufferGeometry) {
    // Vertex positions
    const verts = geometry.getAttribute('position').array;
    // Average vertex coordinates
    const total = new Vector3(0, 0, 0);
    for (let i = 0; i < verts.length; i++) {
        total.add(new Vector3(verts[i * 3], verts[i * 3 + 1], verts[i * 3 + 2]));
    }
    const centroid = total.divideScalar(verts.length / 3);
    return centroid;
}

// Average the x, y, z components of a 3d vector
export function vectors3Average(vectors: Vector3[]) {
    const average = vectors.reduce((a, b) => a.add(b)).divideScalar(vectors.length);
    return average;
}

// Get dimensions for plane to cover entire canvas
export function getFullScreenPlaneDim(fov: number, z: number, canvasW: number, canvasH: number) {
    const _fov = deg2rad(fov);
    const h = 2 * Math.tan(_fov / 2) * Math.abs(z);
    const w = h * (canvasW / canvasH);
    return [w, h];
}

// Get an array of evenly spaced elements from 0 to n
export function linspace(n: number) {
    return Array.apply(null, Array(n + 1)).map((_, i) => i / n);
}
