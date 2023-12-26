/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

init();

function mapRand(min, max, isInt = false) {
  let rand = Math.random() * (max - min) + min;
  rand = isInt ? Math.round(rand) : rand;
  return rand;
}

async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 90;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ライト
  const ambientLight = new THREE.AmbientLight(0x3f3f46);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-26, 7, 100);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  const pointLightHelper = new THREE.PointLightHelper(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xaabbff, 0.2);
  directionalLight.position.set(0, 0, 1);
  scene.add(ambientLight, pointLight, pointLightHelper, directionalLight);

  // メッシュ
  const SCALE = 30,
    X_NUM = 10,
    Y_NUM = 6,
    COLORS = { MAIN: "#f3f4f6", SUB: "#60a5fa" };

  const meshes = [];

  const boxGeometry = new THREE.BoxGeometry(SCALE, SCALE, SCALE);
  const mainMaterial = new THREE.MeshLambertMaterial({ color: COLORS.MAIN });
  const subMaterial = new THREE.MeshLambertMaterial({ color: COLORS.SUB });

  for (let x = 0; x <= X_NUM; x++) {
    for (let y = 0; y <= Y_NUM; y++) {
      const randomNum = Math.random();
      const material = randomNum < 0.2 ? subMaterial : mainMaterial;
      const box = new THREE.Mesh(boxGeometry, material);
      box.position.x = x * SCALE - (X_NUM * SCALE) / 2;
      box.position.y = y * SCALE - (Y_NUM * SCALE) / 2;
      box.position.z = mapRand(0, 20);
      box.scale.set(0.98, 0.98, 0.98);
      box.castShadow = true;
      box.receiveShadow = true;
      meshes.push(box);
    }
  }
  scene.add(...meshes);

  const control = new OrbitControls(camera, renderer.domElement);

  //物体の移動
  function getAction(z) {
    const random = mapRand(0, 0.5);
    const translate = function () {
      const direction = z > 0 ? -random : random;
      this.position.z += direction;
    };
    return translate;
  }

  let targetMeshes = [];

  setInterval(() => {
    targetMeshes.forEach((mesh) => (mesh.action = null));
    targetMeshes = [];
    for (let i = 0; i < 10; i++) {
      //メッシュをランダムに取得
      const mesh = meshes[mapRand(0, meshes.length - 1, true)];
      //メッシュにactionプロパティを関数で登録
      mesh.action = getAction(mesh.position.z);
      targetMeshes.push(mesh);
    }
  }, 2000);

  //アニメ-ション関数
  function animate() {
    requestAnimationFrame(animate);

    targetMeshes.forEach((mesh) => {
      mesh.action();
    });

    control.update();

    renderer.render(scene, camera);
  }

  animate();
}
