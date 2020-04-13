<template>
  <div>
    <div class="container" ref="container">
      <canvas ref="three"></canvas>
      <button ref="button" v-on:click="controller">Pause</button>
    </div>
  </div>
</template>

<script>
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereBufferGeometry,
  Mesh
} from 'three'
import { NoiseShader } from '~/shader/NoiseShader'

export default {
  name: 'Header3D',
  data() {
    return {
      scene: new Scene(),
      cam: null,
      renderer: null,
      sphere: null,
      shader: null,
      pause: false
    }
  },
  mounted() {
    this.setup()
    this.loop()

    window.addEventListener('resize', () => {
      this.resizeCanvas()
    })
  },
  methods: {
    controller() {
      this.pause = !this.pause
      if (!this.pause) {
        this.loop()
      }
      this.$refs.button.innerHTML = this.pause ? 'Play' : 'Pause'
    },
    setup() {
      const container = this.$refs.container
      const canvas = this.$refs.three

      let height = container.offsetHeight
      let width = container.offsetWidth

      this.cam = new PerspectiveCamera(
        60,
        canvas.width / canvas.height,
        0.1,
        1200
      )

      this.renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvas
      })

      this.resizeCanvas(width, height)

      // transparent
      this.renderer.setClearColor(0xffffff, 0.0)

      this.cam.position.set(0, 0, 20)
      this.cam.lookAt(0, 0, 0)

      let geo = new SphereBufferGeometry(8, 10, 10)
      // let mat = new THREE.MeshNormalMaterial({
      //   wireframe: true
      // })
      this.shader = NoiseShader

      this.sphere = new Mesh(geo, this.shader)
      this.scene.add(this.sphere)
    },
    loop() {
      // this.sphere.rotation.y -= 0.01
      this.shader.uniforms['u_time'].value += 0.1

      this.renderer.render(this.scene, this.cam)

      if (!this.pause) {
        window.requestAnimationFrame(this.loop)
      }
    },
    resizeCanvas() {
      console.log('resized')
      let container = this.$refs.container
      let height = container.offsetHeight
      let width = container.offsetWidth

      this.$refs.three.width = width
      this.$refs.three.height = height

      this.cam.aspect = width / height
      this.cam.updateProjectionMatrix()

      this.renderer.setSize(width, height)
    }
  }
}
</script>

<style scoped>
div.container {
  position: relative;
  top: 0;
  left: 0;
  height: 0;
  padding-bottom: 56.66%;
  width: 100%;
  overflow: hidden;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
button {
  font-family: 'Neue Montreal Medium', sans-serif;
  position: absolute;
  top: 0rem;
  left: 2rem;

  font-size: 0.9rem;
  background: var(--near-white);
  border: 1px solid var(--near-black);
  border-radius: 1em;
  padding: 0 0.4em;

  transition: all ease 0.3s;
}
button:hover {
  background: var(--near-black);
  color: var(--near-white);
  cursor: pointer;
}
</style>
