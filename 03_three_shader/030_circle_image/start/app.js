/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";

init();
async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    return texture;
  }

  const geometry = new THREE.PlaneGeometry(40, 53);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: await loadTex("/img/water.jpg") },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  console.log(geometry);

  camera.position.z = 30;

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}
