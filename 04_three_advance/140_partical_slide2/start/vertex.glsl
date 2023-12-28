precision lowp float;

#pragma glslify: qInOut = require(glsl-easings/quintic-in-out)
#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)
#pragma glslify: exOut = require(glsl-easings/exponential-out)

attribute float aDelay;
attribute float aIntensity;

varying vec2 vUv;
varying float vAlpha;
varying float vProgress;

uniform float uProgress;

void main() {
    vUv = uv;
    vec3 pos = position;
    const float cameraZ = 1000.0;

    float progress = 1. - abs(2. * uProgress - 1.);
    vProgress = progress;
    progress = qInOut(progress);

    pos.z += progress * aIntensity;

    vec2 xyDirection = (uv - 0.5) * 2.0;
    float xyIntensity = cameraZ;
    pos.xy += xyDirection * xyIntensity * pos.z / cameraZ; 

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.2 * (cameraZ / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = mix(0.1, 1.0, -mvPosition.z / cameraZ);
}