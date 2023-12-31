precision lowp float;

varying vec2 vUv;
varying float vDelay;
varying float vProgress;

uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uProgress;
uniform float uTick;

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  if(vProgress > 0.1 && distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
    discard;
  }
  vec4 texCurrent = texture(uTexCurrent, vUv);
  vec4 texNext = texture(uTexNext, vUv);
  vec4 tex = mix(texCurrent, texNext, uProgress);

  gl_FragColor = tex;
}