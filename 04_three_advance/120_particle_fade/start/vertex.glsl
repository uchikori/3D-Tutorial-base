precision mediump float;

#pragma glslify: sineout = require(glsl-easings/quadratic-in-out)
#pragma glslify: exponential = require(glsl-easings/exponential-in-out)
#pragma glslify: snoise = require(glsl-noise/simplex/3d)


varying vec2 vUv;
varying float vDelay;
attribute float aDelay;
// attribute vec3 plane;
attribute vec3 sphere;

uniform float uProgress;
uniform float uTick;
uniform float uScaleDelay;
uniform float uScaleTime;

void main() {
    vUv = uv;
    vec3 pos = position;

    float n = snoise(vec3(position.x, position.y, uTick * 0.01));
    //n => 0~1
    n = n * 0.5 + 0.5; 

    float delay = exponential(clamp(uProgress * 2. - aDelay* 0.3, 0.0, 1.0));
    vDelay = delay;
    

    pos.x += 800.0 * n * delay;
    pos.y += 800.0 * n * delay;
    pos.z += 200.0 * n * delay;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 7. * (500. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}