uniform float u_progress;
attribute vec3 dir;

float chunkDistance(float t) {
    return 1.7 * log(t + 1.0);
}

float chunkSize(float t) {
    return exp(-0.1 * t);
}

void main() {
    float dist = chunkDistance(u_progress);
    // Translate
    vec3 t = dir * dist;
    // Scale
    float s = chunkSize(u_progress);
    // Transform vertex
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
    vec4 pos = translateMatrix * scaleMatrix * vec4(position, 1.0);
    csm_Position = pos.xyz;
}
