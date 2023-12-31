precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;
uniform float uTick;
uniform float uSaturation;
uniform float uLightness;
uniform float uColorTime;
uniform float uColorDelay;
uniform float uProgress;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    discard;
  }
  vec4 tex = texture(uTex, gl_PointCoord);

  float hue = sin(uTick * uColorTime - vDelay * uColorDelay) * 0.5 + 0.5;
  vec3 rgb = hsl2rgb(hue, uSaturation, uLightness);

  //平面の時に円になるように透明度を設定
  // float planeAlpha = length(vUv - vec2(0.5,0.5));
  // float length = smoothstep(0.2, 0.5, planeAlpha);
  // float circle = 1.0 - length;

  float planeAlpha = 0.5 - length(vUv - vec2(0.5,0.5));
  planeAlpha *= 2.0;
  float sphereAlpha = 1.0;
  float alpha = mix(planeAlpha, sphereAlpha, uProgress);

  gl_FragColor = vec4(rgb, alpha);
  // gl_FragColor = tex;
}