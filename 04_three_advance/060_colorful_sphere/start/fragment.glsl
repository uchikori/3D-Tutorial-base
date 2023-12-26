precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;
uniform float uProgress;

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  //0.0~1.0までの座標を持つgl_PointCoordと中点(0.5, 0.5)の距離が0.5を超える場合
  if(distance(gl_PointCoord, vec2(0.5,0.5)) > 0.5){
    //fragmentを破棄する（つまり円になる）
    discard;
  }
  vec4 tex = texture(uTex, gl_PointCoord);
  
  // gl_FragColor = vec4(vDelay, 0., 0., 1.);
  gl_FragColor = tex;
}