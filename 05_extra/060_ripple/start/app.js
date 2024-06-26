/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { Mesh } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//波紋クラス
class Ripple {
  constructor(tex) {
    const ripple = { width: 100, height: 100 };
    this.geo = new THREE.PlaneGeometry(ripple.width, ripple.height);
    this.material = new THREE.MeshBasicMaterial({ transparent: 1, map: tex });
    this.mesh = new THREE.Mesh(this.geo, this.material);
    //初期状態では不可視状態
    this.mesh.visible = false;
    //使用中かどうかの状態変数
    this.isUsed = false;
  }
  start(mouse) {
    const { mesh, material } = this;

    //メッシュを可視状態にする
    mesh.visible = true;
    //使用中にする
    this.isUsed = true;

    //メッシュをマウスに追従させる
    mesh.position.x = mouse.x;
    mesh.position.y = mouse.y;

    //メッシュの大きさの変更
    mesh.scale.x = mesh.scale.y = 0.2;
    //透明度の変更
    material.opacity = 0.8;
    mesh.rotation.z = 2 * Math.PI * Math.random();

    this.animate();
  }

  animate() {
    const { mesh, material } = this;

    //メッシュの大きさを変更
    mesh.scale.y = mesh.scale.x = mesh.scale.x + 0.07;
    //透明度を変更
    material.opacity *= 0.96;
    //回転角度を変更
    mesh.rotation.z += 0.003;

    //透明度が0.01以下になったら
    if (material.opacity <= 0.01) {
      //波紋は不使用状態にする
      this.isUsed = false;
      //メッシュを不可視状態にする
      mesh.visible = false;
    } else {
      //波紋のアニメーション
      requestAnimationFrame(() => {
        this.animate();
      });
    }
  }
}

(async () => {
  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    0.1,
    1000
  );

  camera.position.z = 500;

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const texLoader = new THREE.TextureLoader();
  const tex = await texLoader.loadAsync(
    "https://static.not-equal.dev/ja_webgl_basic/img/displacement/ripple.png"
  );
  const ripples = [];
  const rippleCount = 50;

  //波紋オブジェクトを50個作成
  for (let i = 0; i < rippleCount; i++) {
    const ripple = new Ripple(tex);
    scene.add(ripple.mesh);
    ripples.push(ripple);
  }

  //マウスオブジェクト
  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    tick: 0,
  };

  //mousemoveイベントを実行
  renderer.domElement.addEventListener("mousemove", (event) => {
    //マウス座標の正規化
    mouse.x = event.clientX - window.innerWidth / 2;
    mouse.y = -event.clientY + window.innerHeight / 2;

    //毎5フレームごとに
    if (mouse.tick % 5 === 0) {
      //rippleオブジェクトの配列からisUsedがfalse状態である最初のrippleオブジェクト（使用中でない）を_rippleに代入
      const _ripple = ripples.find((ripple) => !ripple.isUsed);

      //使用できる要素が存在しない場合は処理を終了
      if (!_ripple) return;

      //_rippleを可視状態にして、マウスに追従させ、使用中状態にする
      _ripple.start(mouse);
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    mouse.tick++;
  }

  animate();
})();
