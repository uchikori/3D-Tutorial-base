/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { Mesh } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


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

  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const geo = new THREE.PlaneGeometry(40, 40);
  const mate = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new Mesh(geo, mate);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
  
})();
