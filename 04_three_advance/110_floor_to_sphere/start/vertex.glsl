precision mediump float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)
#pragma glslify: easeCubic = require(glsl-easings/exponential-in-out)

#pragma glslify: rotate = require(glsl-rotate)

varying vec2 vUv;
varying float vDelay;
attribute float aDelay;
// attribute vec3 plane;
attribute vec3 sphere;

uniform float uTick;
uniform float uProgress;
uniform float uScaleDelay;
uniform float uScaleTime;

void main() {
    vUv = uv;
    vDelay = aDelay;

    //平面の頂点位置
    vec3 p = position;

    //球体の頂点位置
    vec3 s = sphere;

    //Planeの波
    float waveP = sin(uTick * 0.02 - aDelay * 5.0);
    p.y += waveP * 100.0;
    p.x += waveP * -50.0;
    p.z += waveP * -50.0;

    //球体の波
    float waveS = sin(uTick * 0.02 - uv.y * 10.0);
    s += waveS * normal * 20.0;

    float delay = easeCubic(clamp(uProgress * 2. - (1. - uv.y ), 0., 1.));
    vec3 pos = mix(p, s, delay);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 5. * (2000. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}