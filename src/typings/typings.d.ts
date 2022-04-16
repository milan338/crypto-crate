// Prevent errors caused by imports that lack type definitions
declare module 'three/examples/jsm/utils/BufferGeometryUtils' {
    export function mergeBufferGeometries(
        geometries: BufferGeometry[],
        useGroups?: boolean
    ): BufferGeometry;
}

declare module 'three/examples/jsm/textures/FlakesTexture' {
    export class FlakesTexture extends HTMLCanvasElement {
        constructor(width = 512, height = 512);
    }
}
