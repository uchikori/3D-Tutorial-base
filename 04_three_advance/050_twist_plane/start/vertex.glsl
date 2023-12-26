precision mediump float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: cubic = require(glsl-easings/cubic-in-out)
#pragma glslify: rotate = require(glsl-rotate/rotate)

#pragma glslify: HALF_PI = require(glsl-constants/HALF_PI)

varying vec2 vUv;
varying float vDelay;
attribute float aDelay;

uniform float uProgress;

void main() {
    vUv = uv;
    vDelay = aDelay;
    vec3 pos = position;
    // aDelay => 0 ~ 1
    // aDelay * 0.3=> 0 ~ 0.3
    float delay = clamp(uProgress * 1.3 - aDelay * 0.3, 0., 1.);
    float progress = cubic(delay);

    // z軸の手前方向に少しずらしておく
    pos.z += 100.;

    //回転
    vec3 axis = vec3(1.0, 1.0, 1.0);
    pos = rotate(pos, axis, 4.0 * HALF_PI * progress);
    
    pos.z += progress * 250.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}