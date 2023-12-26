/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
init();
async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // const geometry = new THREE.BoxGeometry();
  // const geometry = new THREE.PlaneGeometry(32, 18);
  // const geometry = new THREE.SphereGeometry();
  const geometry = new THREE.TorusGeometry(10, 3, 200, 20);
  const texLoader = new THREE.TextureLoader();
  // const texture1 = await texLoader.loadAsync("/img/output1.jpg");
  // const texture2 = await texLoader.loadAsync("/img/output2.jpg");
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    //回転
    // mesh.rotation.x += 0.01;

    //平行移動
    // mesh.position.z += 0.03;
    // mesh.position.set()
    // geometry.translate(0.01, 0.01, 0.01);

    //スケール
    // mesh.scale.x += 0.01;
    // mesh.scale.y += 0.01;
    geometry.scale(1.02, 1.02, 0);
    control.update();

    renderer.render(scene, camera);
  }

  animate();
}
