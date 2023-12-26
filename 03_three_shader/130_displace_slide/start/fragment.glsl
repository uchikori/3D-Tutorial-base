precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform sampler2D uTexDisp;
uniform float uTick;
uniform float uProgress;
uniform vec2 uNoiseScale;
float parabola( float x, float k ) {
  return pow( 4. * x * ( 1. - x ), k );
}
void main() {

  // n => -1 ~ 1
  float n = noise2(vec2(vUv.x * uNoiseScale.x, vUv.y * uNoiseScale.y));
  // n => -1 ~ 0
  n = n * 0.5 - 0.5;
  // uProgress => 0 ~ 1
  n = n + uProgress;
  //nが0以上なら1 0の場合は0
  n = step(0.0, n);
  
  //画像切り替え時の中間画像のテクスチャ
  vec4 texDisp = texture(uTexDisp, vUv);
  //rの値は0.0か1.0のみ(白黒画像なので)
  float disp = texDisp.r;
  //uProgressが0と1の時は0の値を取るようにする(uProgressが0.5の時に1の値を取る)
  disp = disp * parabola(uProgress, 1.0);
  vec2 dispUv = vec2(vUv.x - disp, vUv.y);
  vec2 dispUv2 = vec2(vUv.x + disp, vUv.y);
  vec4 texCurrent = texture(uTexCurrent, dispUv);
  vec4 texNext = texture(uTexNext, dispUv2);

  gl_FragColor = mix(texCurrent, texNext, uProgress);
  // gl_FragColor = texNext;
}