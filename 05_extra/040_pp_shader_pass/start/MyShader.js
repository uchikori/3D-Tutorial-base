/**
 * Full-screen textured quad shader
 */
import ppFragmentShader from "./ppfragment.glsl";
const MyShader = {
  uniforms: {
    tDiffuse: { value: null },
    // opacity: { value: 1.0 },
    uDivide: { value: 0.5 },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: ppFragmentShader,
};

export { MyShader };
