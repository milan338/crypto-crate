import { forwardRef } from 'react';
import Material from 'component-material';
import type { ComponentMaterialProps, MT } from 'component-material';

// TODO migrate to https://github.com/FarazzShaikh/THREE-CustomShaderMaterial

export type SphereChunkMT = MT & {
    _progress: { value: number; type: string };
};

const vertHead = /* glsl */ `
    attribute vec3 dir;
    float chunkDistance(float t) {
        return 1.7 * log(t + 1.0);
    }
    float chunkSize(float t) {
        return exp(-0.1 * t);
    }`;

const vertBody = /*glsl*/ `
    float dist = chunkDistance(progress);
    // Translation
    vec3 t = dir * dist;
    // Scale
    float s = chunkSize(progress);
    // Vertex transforms
    mat4 translateMatrix = mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(t.x, t.y, t.z, 1.0));
    mat4 scaleMatrix = mat4(
        vec4(s, 0, 0, 0),
        vec4(0, s, 0, 0),
        vec4(0, 0, s, 0),
        vec4(0, 0, 0, 1));
    vec4 newPos = translateMatrix * scaleMatrix * vec4(position, 1.0);
    vec4 worldPos = modelMatrix * newPos;
    gl_Position = projectionMatrix * modelViewMatrix * newPos;`;

const SphereChunkMaterial = forwardRef((props: ComponentMaterialProps, ref) => (
    // Default extends MeshPhysicalMaterial
    <Material
        {...props}
        ref={ref}
        uniforms={{
            progress: { value: 0, type: 'float' },
        }}
    >
        <Material.Vert.Head
            // eslint-disable-next-line react/no-children-prop
            children={vertHead}
        />
        <Material.Vert.Body
            // eslint-disable-next-line react/no-children-prop
            children={vertBody}
        />
    </Material>
));
SphereChunkMaterial.displayName = 'SphereChunkMaterial';

export default SphereChunkMaterial;
