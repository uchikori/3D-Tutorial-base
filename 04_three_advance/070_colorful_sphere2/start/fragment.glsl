precision mediump float;

varying vec2 vUv;
varying float vDelay;
varying float uDelay;

uniform sampler2D uTex;
uniform float uProgress;
uniform float uSaturation;
uniform float uLightness;
uniform float uTick;
uniform float uColorTime;
uniform float uColorDelay;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    discard;
  }
  vec4 tex = texture(uTex, gl_PointCoord);
  
  //0~1までのsinカーブ
  float hue = sin(uTick * uColorTime - vDelay * uColorDelay) * 0.5 + 0.5;
  vec3 rgb = hsl2rgb(hue, uSaturation, uLightness);
  gl_FragColor = vec4(rgb , 1.);

  //デバッグ用
  // gl_FragColor = vec4(step(uProgress, vDelay), 1.0, 0., 1.);

  // gl_FragColor = tex;
}