// Adapted from https://www.shadertoy.com/view/Xdl3D2
uniform float u_time;
uniform float u_shift;
uniform float u_speed;
uniform float u_translatex;
uniform vec2 u_resolution;
uniform sampler2D u_noise;

vec4 noise(ivec2 x) {
    return texture2D(u_noise, (vec2(x) + 0.5) / 256.0, -100.0);
}

void main() {
    vec3 ray;
    ray.xy = 5.0 * (gl_FragCoord.xy - u_resolution.xy * 0.5) / u_resolution.xy;
    // Translate centre of effect
    ray.x -= u_translatex;
    ray.z = 1.0;
    // How much to move particles
    float offset = u_time * u_speed;
    // Intensity of color shifting on particles
    float shift = u_shift + 0.1;
    offset *= 2.0;
    vec3 col = vec3(0);
    vec3 stp = ray / max(abs(ray.x), abs(ray.y));
    vec3 pos = 2.0 * stp + .5;
    for (int i = 0; i < 40; i++) {
        float z = noise(ivec2(pos.xy)).x;
        z = fract(z - offset);
        float d = 50.0 * z - pos.z;
        float w = pow(max(0.0, 1.0 - 8.0 * length(fract(pos.xy) - 0.5)), 2.0);
        vec3 c = max(vec3(0), vec3(1.0 - abs(d + u_shift * 0.5) / shift, 1.0 - abs(d) / shift, 1.0 - abs(d - u_shift * 0.5) / shift));
        col += 1.5 * (1.0 - z) * c * w;
        pos += stp;
    }
    gl_FragColor = vec4(col / 2.5, 1.0);
}
