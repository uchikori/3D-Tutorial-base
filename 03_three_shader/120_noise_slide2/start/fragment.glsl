precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uTick;
uniform float uProgress;
uniform vec2 uNoiseScale;

void main() {

  //n => -1 ~ 1
  // uv座標の全ての座標にノイズを発生させる
  float n = noise2(vec2(sin(vUv.x), cos(vUv.y)));
  //n => -1 ~ 0
  n = n * 0.5 - 0.5; 
  //uProgress => 0 ~ 1
  n = n + uProgress;
  //uProgressの値が0の時はnは0未満なのでnは0の値、uProgressが0以上の時は1の値がnに代入される
  n = step(0.0, n);
  vec4 texCurrent = texture(uTexCurrent, vUv);
  vec4 texNext = texture(uTexNext, vUv);
  gl_FragColor = mix(texCurrent, texNext, n);

  // mat3 colorMatrix = mat3(0.1, 0.0, 1.402, 0.1, -0.344, -0.714, 0.1, 1.772, 0.0);

  // vec3 red = vec3(5.0, 8.0, uTick * 0.01);
  // vec3 green = vec3(8.0, 6.0, uTick * 0.01);
  // vec3 blue = vec3(10.0, 8.0, uTick * 0.01);

  // float r = noise3(vec3(red.x, red.y * vUv.y, red.z));
  // float g = noise3(vec3(green.x * vUv.x, green.y, green.z));
  // float b = noise3(vec3(blue.x, blue.y * vUv.y, blue.z));

  // gl_FragColor = vec4(colorMatrix * vec3(r, g,b), 1.0);
}