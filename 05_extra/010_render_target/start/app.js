/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/****************************************************************
 * Ⅰ.メインレンダラーの設定
 ****************************************************************/
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

/****************************************************************
 * Ⅱ.レンダラーターゲットの設定
 ****************************************************************/
const renderTarget = new THREE.WebGLRenderTarget(500, 500);
const rtScene = new THREE.Scene();
rtScene.background = new THREE.Color(0x444444);

/****************************************************************
 * Ⅲ.メインレンダラーの作成
 ****************************************************************/
//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 5);
const controls = new OrbitControls(camera, renderer.domElement);
//メッシュ
const geo = new THREE.BoxGeometry(4, 4, 4);
const mate = new THREE.MeshBasicMaterial({
  map: renderTarget.texture,
});
const mesh = new THREE.Mesh(geo, mate);
//メインレンダラーのシーンにメッシュを追加
scene.add(mesh);

/****************************************************************
 * Ⅳ.レンダーターゲットの作成
 ****************************************************************/
//カメラ
const rtCamera = camera.clone();
rtCamera.aspect = 1;
rtCamera.updateProjectionMatrix();

//メッシュ
const rtGeo = new THREE.BoxGeometry(4, 4, 4);
const rtMate = new THREE.MeshLambertMaterial({
  color: 0x009dff,
  side: THREE.DoubleSide,
});
const rtMesh = new THREE.Mesh(rtGeo, rtMate);
//ライト1
const light1 = new THREE.PointLight(0xffffff, 1, 0);
light1.position.set(0, 20, 0);
rtScene.add(light1);
//ライト2
const light2 = new THREE.PointLight(0xffffff, 1, 0);
light2.position.set(10, 20, 10);
rtScene.add(light2);
//ライト3
const light3 = new THREE.PointLight(0xffffff, 1, 0);
light3.position.set(-10, -20, -10);
rtScene.add(light3);
//レンダーターゲットシーンにメッシュを追加
rtScene.add(rtMesh);

/****************************************************************
 *Ⅴ.アニメーション
 ****************************************************************/
function animate() {
  requestAnimationFrame(animate);

  //Ⅴ-Ⅰ.レンダーターゲットのレンダリング
  renderer.setRenderTarget(renderTarget);
  renderer.render(rtScene, rtCamera);
  renderer.setRenderTarget(null);

  //Ⅴ-Ⅱ.メインレンダラーのレンダリング
  renderer.render(scene, camera);

  //レンダーターゲット内のメッシュの回転
  rtMesh.rotation.x += 0.01;
  rtMesh.rotation.y += 0.01;

  controls.update();
}

animate();
