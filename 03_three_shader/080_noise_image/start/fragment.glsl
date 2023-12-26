precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;
uniform vec2 uNoiseScale;

void main() {
  // 模様を変化させる
   float n = noise3(vec3(vUv * uNoiseScale.x,  uTick * 0.01));

   vec4 color = texture2D(uTex, vUv - n);

  gl_FragColor = color;
}