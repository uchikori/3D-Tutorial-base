/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import initRipplePass from "./pass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import vertexShader from "./vertex.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

  //ポストプロセッシングの設定
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  //initRipplePassから関数を分割代入
  const { onMousemove, renderRipple, getTexture } = await initRipplePass(
    composer
  );

  //メインレンダラーのテクスチャー設定
  const texLoader = new THREE.TextureLoader();
  const imageTex = await texLoader.loadAsync("/img/output1.jpg");

  //レンダーターゲットに描画された内容を取得して表示
  const imgGeo = new THREE.PlaneGeometry(480, 270);
  const imgMate = new THREE.MeshBasicMaterial({ map: imageTex });
  const mesh = new THREE.Mesh(imgGeo, imgMate);

  //複数
  const boxGeo = new THREE.BoxGeometry(300, 300, 300);
  const boxMate = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: `
    precision mediump float;

    varying vec2 vUv;

    void main(){
      gl_FragColor = vec4(vUv, 1.0, 1.0);
    }
    `,
  });
  const cube = new THREE.Mesh(boxGeo, boxMate);
  cube.position.x = -200;
  mesh.position.x = 200;

  scene.add(mesh, cube);

  //マウス操作でonMousemoveを実行
  renderer.domElement.addEventListener("mousemove", onMousemove);

  //マウスで画面操作
  const controls = new OrbitControls(camera, renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    renderRipple(renderer);
    // renderer.render(scene, camera);
    composer.render();
    controls.update();
  }

  animate();
})();
