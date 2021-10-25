// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/useGLTF.tsx
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useLoader } from '@react-three/fiber';
import type { Loader, Mesh, Material } from 'three';
import type { GLTF as _GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export interface GLTF extends _GLTF {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
}

function extensions(
    useDraco: boolean | string,
    useMeshopt: boolean,
    extendLoader?: (loader: GLTFLoader) => void
) {
    return (loader: Loader) => {
        if (extendLoader) {
            extendLoader(loader as GLTFLoader);
        }
        if (useDraco) {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath(
                typeof useDraco === 'string'
                    ? useDraco
                    : 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/'
                // https://github.com/google/draco/releases
            );
            (loader as GLTFLoader).setDRACOLoader(dracoLoader);
        }
        if (useMeshopt) {
            // (loader as GLTFLoader).setMeshoptDecoder(
            //     typeof MeshoptDecoder === 'function' ? MeshoptDecoder() : MeshoptDecoder
            // );
            throw new Error('Meshopt has been removed from useGLTF');
        }
    };
}

export function useGLTF<T extends string | string[]>(
    path: T,
    useDraco: boolean | string = true,
    useMeshOpt: boolean = false,
    extendLoader?: (loader: GLTFLoader) => void
): T extends any[] ? GLTF[] : GLTF {
    const gltf = useLoader(GLTFLoader, path, extensions(useDraco, useMeshOpt, extendLoader));
    return gltf as T extends any[] ? GLTF[] : GLTF;
}

useGLTF.preload = (
    path: string | string[],
    useDraco: boolean | string = true,
    useMeshOpt: boolean = false,
    extendLoader?: (loader: GLTFLoader) => void
) => useLoader.preload(GLTFLoader, path, extensions(useDraco, useMeshOpt, extendLoader));

useGLTF.clear = (input: string | string[]) => useLoader.clear(GLTFLoader, input);
