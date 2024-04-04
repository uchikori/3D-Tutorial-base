precision mediump float;

varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D texRipple;

void main(){
  vec4 ripple = texture2D(texRipple, vUv);
  

  vec2 rippleUv = vUv + ripple.b * 0.1;

  vec4 color = texture2D(tDiffuse,rippleUv);

  gl_FragColor = color;
}