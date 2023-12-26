precision mediump float;
#pragma glslify: easeBack = require(glsl-easings/back-in-out.glsl);

varying vec2 vUv;
varying float vDelay;
attribute float aDelay;

uniform float uProgress;

void main() {
    vUv = uv;
    vDelay = aDelay;

    vec3  pos = position;
    //progressの値がマイナスにならないように最小値を設ける
    //aDelay * 0.3 ⇒ aDelayが1の値の場合progressが0になり、底辺のz座標が移動しないため、0.3をかけてaDelayが1にならないようにする
    //傾斜の原因はaDelayが0の箇所と1の箇所とでprogressに格納される値が異なるからなので、どちらの場合でもmax値である1になるようにすればよい（uProgress - aDelayが1以上になればいい)
    float progress = easeBack(clamp(uProgress * 1.4 - aDelay * 0.3, 0.0,1.0));
    pos.z += progress * 250.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}