precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  vec4 tex = texture(uTex, vUv);

  gl_FragColor = vec4(tex.rgb, 1.0 - vDelay);
  // gl_FragColor = tex;
}