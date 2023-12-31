precision mediump float;
varying vec3 vVertexColor;
uniform vec2 uColor;

void main() {
  float floatValue = 0.5;
  vec2 v3 = vec2(0.0) + floatValue;
  vec4 v1 = vec4(v3,1.0, 1.0);
  vec4 v2 = vec4(0.5, 0.0, 1.0,1.0);
  vec4 color = v1 - v2;
  gl_FragColor = v1;
}