// Prevent errors caused by importing BufferGeometryUtils
declare module 'three/examples/jsm/utils/BufferGeometryUtils' {
    export function mergeBufferGeometries(
        geometries: BufferGeometry[],
        useGroups?: boolean
    ): BufferGeometry;
}

// Prevent errors caused by extend()
declare global {
    namespace JSX {
        interface IntrinsicElements {
            // sphereShaderMaterial: any;
        }
    }
}
