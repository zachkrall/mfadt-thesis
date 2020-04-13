import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2.js";
import { Shader as shader } from "./shader.js";

const color = {
  black: 0x000000,
  white: 0xffffff
};

export default class Sketch {
  constructor(_canvas, _width, _height) {
    /* canvas properties */
    this.canvas = _canvas;
    this.canvas.style.width = _width;
    this.canvas.style.height = _height;

    /* sizing */
    this.w = _width;
    this.h = _height;

    /* create scene */
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this.canvas
    });

    this.loader = new OBJLoader2();

    this.frameCount = 0;

    // const texture = new THREE.TextureLoader().load("../.jpg");

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.light = new THREE.DirectionalLight(0xffffff, 1.0);
    // this.light_helper = new THREE.DirectionalLightHelper(this.light, 5);
    // this.envlight = new THREE.AmbientLight(0x6666ff, 0.9);

    this.shader = shader;

    /* SHADER */
    this.shaderConfig = {
      uniforms: shader.uniforms,
      vertexShader: shader.vertexBasic,
      fragmentShader: shader.fragmentShader_Lines,
      wireframe: shader.wireframe || false,
      defines: shader.defines,
      side: THREE.DoubleSide
    };

    this.shader.uniforms["u_time"].value = this.frameCount;
    this.shader.uniforms["u_resolution"].value = [this.w, this.h];
    this.shader.uniforms["amp"].value = 0.0;

    this.shaderMaterial = new THREE.ShaderMaterial(this.shaderConfig);
  }

  setup() {
    let { w, h, loader, scene } = this;

    /* Renderer Properties */
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(color.black, 0.0);
    this.renderer.setClearAlpha(0.0);

    // let animatedTexture = new THREE.TextureLoader().load(
    //   "../box-animation.png"
    // );
    // // animatedTexture.offset.x = 0.0;
    // // animatedTexture.offset.y = 0.0;
    // //
    // // animatedTexture.repeat.x = 0.25;
    // // animatedTexture.repeat.y = 0.25;
    //
    this.facePlaneMat = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      map: null
    });
    // this.facPlaneMat = new THREE.MeshBasicMaterial({
    //   map: animatedTexture,
    //   color: 0x000000
    // });
    this.facePlaneGeo = new THREE.PlaneBufferGeometry(2, 2, 2);
    this.facePlane = new THREE.Mesh(this.facePlaneGeo, this.facePlaneMat);

    // this.facePlane.position.set(0, 0, 0.05);

    // scene.add(this.facePlane);

    let loadThis = new OBJLoader2().load(
      "../faceMesh-2.obj",
      object => {
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            // child.material = new THREE.MeshBasicMaterial({
            //   color: color.white,
            //   wireframe: false
            // });
            // console.log(child);
            child.material = this.shaderMaterial;
          }
        });

        let face_mesh = object;
        face_mesh.scale.set(10, 10, 10);
        scene.add(face_mesh);
      },
      null,
      null
    );
    /* Camera Position */
    this.camera.position.set(0, 0, 2);
    this.camera.lookAt(0, 0, 0);
    this.renderer.render(this.scene, this.camera);
  }

  loop() {
    let { renderer, scene, frameCount, camera } = this;

    this.shader.uniforms["u_time"].value += 0.1;
    this.shader.uniforms["amp"].value = Math.sin(frameCount) * 10;

    this.controls.update();
    // scene.rotation.y += 0.01;

    renderer.render(scene, camera);
    frameCount += 1;
  }

  addResizeListener() {
    window.addEventListener("resize", () => {
      this.resizeWindow(window.innerWidth, window.innerHeight);
    });
  }

  resizeWindow(w, h) {
    this.w = w;
    this.h = h;
    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.w, this.h);
  }
}
