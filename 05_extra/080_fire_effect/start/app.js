/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

(async () => {
  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    -window.innerHeight,
    window.innerHeight
  );

  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  //複数
  const geo = new THREE.PlaneGeometry(200, 400);
  const mate = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 1.0,
      },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  const mesh = new THREE.Mesh(geo, mate);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);
    mate.uniforms.time.value += 0.05;
    renderer.render(scene, camera);
  }

  animate();
})();
