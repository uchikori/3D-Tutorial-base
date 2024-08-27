uniform float uDivide;

uniform sampler2D tDiffuse;

varying vec2 vUv;

void main(){
  //テクスチャの取得
  vec4 texel = texture2D(tDiffuse,vUv);
  //色の反転
  vec3 invertRGB = 1.0 - texel.rgb;
  vec4 invertColor = vec4(invertRGB,1.0);

  //vUv.xがuDivideより大きい場合=>1.0 小さい場合=>0.0
  float stepX = step(uDivide, vUv.x);
  //stepXの値が0の場合=>texel stepXの値が1の場合invertColor
  gl_FragColor = mix(texel, invertColor, stepX);
}