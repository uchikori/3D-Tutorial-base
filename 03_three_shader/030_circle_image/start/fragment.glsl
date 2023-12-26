varying vec2 vUv;
uniform sampler2D uTex;

void main() {
  // vVertexPosition = (-1, 0) => (1, 1)
  // colorTmp = (0, 0) => (1, 1)
  vec2 center = vec2(0.5,0.5 * 1.325);//vUvは0,0から1,1までの値を持つため中心は0.5,0.5となる
  vec2 p = vUv;
  // p.x = p.x * 2.0;
  p.y = p.y * 1.325;
  float len = distance(p, center) * 4.0;
  //※lengthを4倍の値に修正するということは0.25以上の値が全て1以上になるということ。
  //つまり下記のsmoothstep式においては「1」を取り得る値の数が増えるということなので、circleの値は0が多くなる。
  //つまり黒塗りの範囲が大きくなる
  float circle = 1. - smoothstep(.99, 1.0, len);
  // float circle = 1. - step(0.9, len);
  vec4 texColor = texture(uTex, vUv);
  vec4 color = texColor * circle;
  // vec4 color = mix(vec4(1.0,0.0,0.0,1.0), texColor, circle);

  gl_FragColor = color;
}