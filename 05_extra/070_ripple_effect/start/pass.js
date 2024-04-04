/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/shaderpass";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

class Ripple {
  constructor(tex) {
    const ripple = { width: 100, height: 100 };
    this.geo = new THREE.PlaneGeometry(ripple.width, ripple.height);
    this.material = new THREE.MeshBasicMaterial({ transparent: 1, map: tex });
    this.mesh = new THREE.Mesh(this.geo, this.material);
    this.mesh.visible = false;
    this.isUsed = false;
  }

  start(mouse) {
    const { material, mesh } = this;

    this.isUsed = true;
    mesh.visible = true;
    mesh.position.x = mouse.x;
    mesh.position.y = mouse.y;
    mesh.scale.x = mesh.scale.y = 0.2;
    material.opacity = 0.8;
    mesh.rotation.z = 2 * Math.PI * Math.random();
    this.animate();
  }

  animate() {
    const { mesh, material } = this;
    mesh.scale.y = mesh.scale.x = mesh.scale.x + 0.07;
    material.opacity *= 0.96;
    mesh.rotation.z += 0.003;

    if (material.opacity <= 0.01) {
      // ループ終了
      this.isUsed = false;
      mesh.visible = false;
    } else {
      requestAnimationFrame(() => {
        this.animate();
      });
    }
  }
}

async function initRipplePass(composer) {
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

  //レンダーターゲット
  const renderer = new THREE.WebGLRenderTarget();

  renderer.setSize(window.innerWidth, window.innerHeight);

  const rippleCount = 50;
  const texLoader = new THREE.TextureLoader();
  const tex = await texLoader.loadAsync("/img/displacement/ripple.png");
  const ripples = [];
  for (let i = 0; i < rippleCount; i++) {
    const ripple = new Ripple(tex);
    scene.add(ripple.mesh);
    ripples.push(ripple);
  }

  //シェーダーマテリアル
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      tDiffuse: { value: null },
      texRipple: { value: renderer.texture },
    },
  });

  //シェーダーパス
  const pass = new ShaderPass(material); //シェーダーパスとして波紋エフェクトを追加
  composer.addPass(pass);

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    tick: 0,
  };

  function onMousemove(event) {
    console.log(event.clientX, event.clientY);
    mouse.x = event.clientX - window.innerWidth / 2;
    mouse.y = -event.clientY + window.innerHeight / 2;

    if (mouse.tick % 5 === 0) {
      const _ripple = ripples.find((ripple) => !ripple.isUsed);

      if (!_ripple) return;

      _ripple.start(mouse);
    }
  }

  //アニメーション関数
  function renderRipple(_renderer) {
    //レンダーターゲットをセット
    _renderer.setRenderTarget(renderer);
    //レンダー描画
    _renderer.render(scene, camera);
    //レンダーターゲットをクリア
    _renderer.setRenderTarget(null);
    //毎フレームtickを増加
    mouse.tick++;
  }

  //レンダーターゲットの描画状態を確認する関数
  function getTexture() {
    return renderer.texture;
  }

  return {
    onMousemove,
    renderRipple,
    getTexture,
  };
}

export default initRipplePass;
