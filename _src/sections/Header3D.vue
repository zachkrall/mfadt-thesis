<template>
  <div class="g-full">
    <div class="container" ref="container">
      <div id="grid"></div>
      <canvas ref="three"></canvas>
      <button ref="button" v-on:click="controller">Pause</button>
    </div>
  </div>
</template>

<script>
import { face } from '~/assets/face.js'
import { TRIANGULATION } from '~/assets/triangulation.js'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Geometry,
  Vector3,
  Vector2,
  Face3,
  MeshBasicMaterial
} from 'three'
import { NoiseShader } from '~/shader/NoiseShader'

export default {
  name: 'Header3D',
  data() {
    return {
      scene: new Scene(),
      cam: null,
      renderer: null,
      faceGeo: null,
      faceObject: null,
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
      this.renderer.setClearColor(0x000000, 0.0)

      this.cam.position.set(0, 50, -200)
      this.cam.lookAt(0, 0, 0)

      this.faceGeo = new Geometry()

      face.scaledMesh.map((vert, index, all) => {
        let x = vert[0] - all[5][0]
        let y = vert[1] - all[5][1]
        let z = vert[2] - all[5][2]

        this.faceGeo.vertices.push(new Vector3(x, y, z))
      })

      for (let i = 0; i < TRIANGULATION.length / 3; i++) {
        const points = [
          TRIANGULATION[i * 3],
          TRIANGULATION[i * 3 + 1],
          TRIANGULATION[i * 3 + 2]
        ]
        this.faceGeo.faces.push(new Face3(...points))
      }

      this.shader = NoiseShader

      let mat = new MeshBasicMaterial({
        wireframe: true,
        color: 0xffffff
      })

      this.faceObject = new Mesh(this.faceGeo, this.shader)
      this.faceObject2 = new Mesh(this.faceGeo, mat)
      this.faceObject.rotation.z = Math.PI
      this.faceObject2.rotation.z = Math.PI

      this.scene.add(this.faceObject)
      this.scene.add(this.faceObject2)
    },
    loop() {
      const container = this.$refs.container
      const canvas = this.$refs.three

      let height = container.offsetHeight
      let width = container.offsetWidth

      this.shader.uniforms['u_time'].value += 0.1
      this.shader.uniforms['u_resolution'].value = new Vector2(width, height)

      this.faceObject.rotation.y += 0.01
      // this.faceObject.rotation.x = 0.2

      this.faceObject2.rotation.y += 0.01
      // this.faceObject2.rotation.x = 0.2
      this.faceObject2.position.z = -10

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
  background-color: #eeeeee;
}
#grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/static/grid.png');
  background-size: 10px, 10px;
  background-position: 50%, 50%;
  opacity: 0.5;
  mix-blend-mode: difference;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
button {
  font-family: 'Neue Montreal Medium', sans-serif;
  position: absolute;
  top: 2rem;
  left: 2rem;

  font-size: 0.9rem;
  background: var(--near-white);
  border: 1px solid var(--near-black);
  border-radius: 5px;
  padding: 0 0.4em;

  transition: all ease 0.3s;

  text-transform: uppercase;
}
button:hover {
  background: var(--near-black);
  color: var(--near-white);
  cursor: pointer;
}
</style>
