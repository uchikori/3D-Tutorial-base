uniform float uDivide;

uniform sampler2D tDiffuse;

varying vec2 vUv;

void main(){
  vec4 texel = texture2D(tDiffuse,vUv);
  vec3 invertRGB = 1.0 - texel.rgb;
  vec4 invertColor = vec4(invertRGB,1.0);

  float stepX = step(uDivide, vUv.x);
  gl_FragColor = mix(texel, invertColor, stepX);
}