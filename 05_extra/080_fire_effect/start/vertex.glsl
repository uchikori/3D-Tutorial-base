 uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;

    // パーミュート関数
    vec3 permute(vec3 x) {
        return mod(((x*34.0)+1.0)*x, 289.0);
    }

    // ドット積
    float dot2(vec2 v) {
        return dot(v, v);
    }

    // パーミュート関数
    vec2 permute(vec2 x) {
        return mod(((x*34.0)+1.0)*x, 289.0);
    }

    // フラクタルブラウン運動
    float fbm(vec2 p) {
        float f = 0.0;
        f += 0.5000 * noise(p); p = p * 2.02;
        f += 0.2500 * noise(p); p = p * 2.03;
        f += 0.1250 * noise(p); p = p * 2.01;
        f += 0.0625 * noise(p);
        return f / 0.9375;
    }

    // パーミュート関数
    vec3 permute(vec3 x) {
        return mod(((x*34.0)+1.0)*x, 289.0);
    }

    // ノイズ関数
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);

        return mix(mix(dot(random2(i), f - vec2(0.0, 0.0)),
                       dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                   mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                       dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
    }

    // ランダム関数
    vec2 random2(vec2 p) {
        return fract(sin(vec2(dot(p, vec2(127.1, 311.7)),
                              dot(p, vec2(269.5, 183.3)))) * 43758.5453);
    }

    void main() {
        vUv = uv;
        vPosition = position;
        vec3 pos = position;
        float noiseFactor = fbm(vec2(position.x * 0.5, position.y * 0.5 + time * 0.2));
        pos.z += noiseFactor * 0.3;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }