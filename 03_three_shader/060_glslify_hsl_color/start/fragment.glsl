varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

void main() {
    float time = uTick * 0.01;
    //fract = 繰り返しと言う認識でOK
    vec3 rgb = hsl2rgb(fract(vUv.x + time), 1.0, 0.5);
    vec4 color = vec4(rgb, 1.0);
    gl_FragColor = color;
}