precision mediump float;

uniform vec2 uColor;
varying vec2 vVertexPosition;

void main() {
    vec2 uv = vVertexPosition / 2.0 + 0.5;
    // uv (0, 0) => (1, 1)
    vec4 rgba1 = vec4(0.2,0.3,0.4,1.0);
    vec4 rgba2 = vec4(0.8,0.3,0.2,1.0);

    //mix()について
    //uv.x = 0のとき、rgba1 * 1.0 rgba2 * 0.0
    //uv.x = 1のとき、rgba1 * 0.0 rgba2 * 1.0
    //uv.x = 0.5のとき、rgba1 * 0.5 rgba2 * 0.5
    // uv.x = step(0.3, uv.x);
    uv = step(0.3, uv);
    vec4 color = vec4(uv.yx, 0.0,1.0);
    gl_FragColor = color;
}