varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;

void main() {

    float time = (uTick  * 0.01) * 0.5 + 0.5;
    vec4 texColor = texture(uTex, vUv);
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

    // color.r = texColor.g * sin(time);
    // color.g = texColor.b * cos(time);
    // color.b = texColor.r;
    // color.rgb = texColor.gbr;
    color.rgb = texColor.rgb * sin(time);
    gl_FragColor = color;
    // gl_FragColor = texColor;
}