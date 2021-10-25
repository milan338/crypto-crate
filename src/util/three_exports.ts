// Adapted from https://gist.github.com/drcmda/974f84240a329fa8a9ce04bbdaffc04d
// Slightly sketchy hacks for reducing bundle sizes:
// Custom webpack config in next.config.js replaces imports from 'three' to here

// * Exports
export * from 'three/src/core/BufferAttribute.js';
export * from 'three/src/constants.js';
export * as MathUtils from 'three/src/math/MathUtils.js';
export { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
export { Scene } from 'three/src/scenes/Scene.js';
export { Mesh } from 'three/src/objects/Mesh.js';
export { Group } from 'three/src/objects/Group.js';
export { SphereGeometry } from 'three/src/geometries/SphereGeometry.js';
export { Material } from 'three/src/materials/Material.js';
export { MeshPhysicalMaterial } from 'three/src/materials/MeshPhysicalMaterial.js';
export { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js';
export { SpotLight } from 'three/src/lights/SpotLight.js';
export { PointLight } from 'three/src/lights/PointLight.js';
export { DirectionalLight } from 'three/src/lights/DirectionalLight.js';
export { AmbientLight } from 'three/src/lights/AmbientLight.js';
export { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
export { OrthographicCamera } from 'three/src/cameras/OrthographicCamera.js';
export { BufferGeometry } from 'three/src/core/BufferGeometry.js';
export { Object3D } from 'three/src/core/Object3D.js';
export { Raycaster } from 'three/src/core/Raycaster.js';
export { Ray } from 'three/src/math/Ray.js';
export { Matrix3 } from 'three/src/math/Matrix3.js';
export { Matrix4 } from 'three/src/math/Matrix4.js';
export { Box2 } from 'three/src/math/Box2.js';
export { Box3 } from 'three/src/math/Box3.js';
export { Line3 } from 'three/src/math/Line3.js';
export { Euler } from 'three/src/math/Euler.js';
export { Vector2 } from 'three/src/math/Vector2.js';
export { Vector3 } from 'three/src/math/Vector3.js';
export { Vector4 } from 'three/src/math/Vector4.js';
export { Quaternion } from 'three/src/math/Quaternion.js';
export { Color } from 'three/src/math/Color.js';
export { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';
// * GLTFLoader
export { Loader } from 'three/src/loaders/Loader.js';
export { FileLoader } from 'three/src/loaders/FileLoader.js';
export { LoaderUtils } from 'three/src/loaders/LoaderUtils.js';
export { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
// export { PropertyBinding } from 'three/src/animation/PropertyBinding.js';
export { PropertyBinding } from '@/util/three/PropertyBinding';
export { ImageBitmapLoader } from 'three/src/loaders/ImageBitmapLoader.js';
export { Sphere } from 'three/src/math/Sphere.js';
export { Texture } from 'three/src/textures/Texture.js';
export { TextureLoader } from 'three/src/loaders/TextureLoader.js';
// * Fiber
export { Layers } from 'three/src/core/Layers.js';
export { Clock } from 'three/src/core/Clock.js';
export { Camera } from 'three/src/cameras/Camera.js';
// * Postprocessing
export { WebGLRenderTarget } from 'three/src/renderers/WebGLRenderTarget.js';
export { MeshDepthMaterial } from 'three/src/materials/MeshDepthMaterial.js';
export { MeshNormalMaterial } from 'three/src/materials/MeshNormalMaterial.js';
export { EventDispatcher } from 'three/src/core/EventDispatcher.js';
export { WebGLMultisampleRenderTarget } from 'three/src/renderers/WebGLMultisampleRenderTarget.js';
export { DepthTexture } from 'three/src/textures/DepthTexture.js';
export { DataTexture } from 'three/src/textures/DataTexture.js';
export { DataTexture3D } from 'three/src/textures/DataTexture3D.js';
export { LoadingManager } from 'three/src/loaders/LoadingManager.js';
export { Uniform } from 'three/src/core/Uniform.js';
// * Stub exports - currently unused, but imported by other modules
export class Bone {} // export { Bone } from 'three/src/objects/Bone.js';
export class Skeleton {} // export { Skeleton } from 'three/src/objects/Skeleton.js';
export class SkinnedMesh {} // export { SkinnedMesh } from 'three/src/objects/SkinnedMesh.js';
export class Line {} // export { Line } from 'three/src/objects/Line.js';
export class LineLoop {} // export { LineLoop } from 'three/src/objects/LineLoop.js';
export class LineSegments {} // export { LineSegments } from 'three/src/objects/LineSegments.js';
export class LineBasicMaterial {} // export { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial.js';
export class InterleavedBuffer {} // export { InterleavedBuffer } from 'three/src/core/InterleavedBuffer.js';
export class InterleavedBufferAttribute {} // export { InterleavedBufferAttribute } from 'three/src/core/InterleavedBufferAttribute.js';
export class Points {} // export { Points } from 'three/src/objects/Points.js';
export class PointsMaterial {} // export { PointsMaterial } from 'three/src/materials/PointsMaterial.js';
export class QuaternionKeyframeTrack {}
export class NumberKeyframeTrack {}
export class VectorKeyframeTrack {}
export class AnimationClip {}
export class Interpolant {}
export class InterpolateDiscrete {}
export class InterpolateLinear {}
// export class WebGLAnimation {}
// ? Potentially unsafe hacks
export class WebXRManager {
    enabled = false;
    isPresenting = false;
    addEventListener() {}
    removeEventListener() {}
    setAnimationLoop() {}
    getCamera() {}
    updateCamera() {}
    dispose() {}
}
export class WebGLCubeMaps {
    dispose() {}
    get() {}
}
export class WebGLCubeUVMaps {
    dispose() {}
    get() {}
}
export class WebGLMorphtargets {
    update() {}
}
// Using react-three-fiber for animation
export class WebGLAnimation {
    start() {}
    stop() {}
    setContext() {}
    setAnimationLoop() {}
}
// export class WebGLBackground { }
export class WebGLShadowMap {
    enabled = false;
    autoUpdate = false;
    needsUpdate = false;
    type: any;
    value: any;
    render() {}
}
// export class WebGLMaterials {}
// * Unused
// export { SphereBufferGeometry } from 'three/src/geometries/SphereGeometry.js';
// export { ShaderLib } from 'three/src/renderers/shaders/ShaderLib.js';
// export { UniformsLib } from 'three/src/renderers/shaders/UniformsLib.js';
// export { UniformsUtils } from 'three/src/renderers/shaders/UniformsUtils.js';
// export { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk.js';
// export { CubeTexture } from 'three/src/textures/CubeTexture.js';
// export { CanvasTexture } from 'three/src/textures/CanvasTexture.js';
// export { PlaneGeometry, PlaneBufferGeometry } from 'three/src/geometries/PlaneGeometry.js';
// export { BoxGeometry, BoxBufferGeometry } from 'three/src/geometries/BoxGeometry.js';
// export { ConeGeometry, ConeBufferGeometry } from 'three/src/geometries/ConeGeometry.js';
// export { CylinderGeometry, CylinderBufferGeometry } from 'three/src/geometries/CylinderGeometry.js';
// export { CircleGeometry, CircleBufferGeometry } from 'three/src/geometries/CircleGeometry.js';
// export { RingGeometry, RingBufferGeometry } from 'three/src/geometries/RingGeometry.js';
// export { EdgesGeometry } from 'three/src/geometries/EdgesGeometry.js';
// export { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js';
// export { LineDashedMaterial } from 'three/src/materials/LineDashedMaterial.js';
// export { SpriteMaterial } from 'three/src/materials/SpriteMaterial.js';
// export { Sprite } from 'three/src/objects/Sprite.js';
// export { SpotLightShadow } from 'three/src/lights/SpotLightShadow.js';
// export { SpotLightHelper } from 'three/src/helpers/SpotLightHelper.js';
// export { CameraHelper } from 'three/src/helpers/CameraHelper.js';
// export { LightShadow } from 'three/src/lights/LightShadow.js';
// export { Triangle } from 'three/src/math/Triangle.js';
// export { Spherical } from 'three/src/math/Spherical.js';
// export { Cylindrical } from 'three/src/math/Cylindrical.js';
// export { Plane } from 'three/src/math/Plane.js';
// export { Frustum } from 'three/src/math/Frustum.js';
// export { GridHelper } from 'three/src/helpers/GridHelper.js';
// export { AxesHelper } from 'three/src/helpers/AxesHelper.js';
// export { InstancedBufferGeometry } from 'three/src/core/InstancedBufferGeometry.js';
// export { InstancedInterleavedBuffer } from 'three/src/core/InstancedInterleavedBuffer.js';
// export { WireframeGeometry } from 'three/src/geometries/WireframeGeometry.js';
// * Legacy
// export { Geometry } from 'three/src/core/Geometry.js';
// export { Face3 } from 'three/src/core/Face3.js';
// export { _Math as Math } from 'three/src/math/Math.js';
