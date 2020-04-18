import * as facemesh from '@tensorflow-models/facemesh'
import * as THREE from 'three'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { range } from './utils'

/*
  async ?!
*/
;(async () => {
  let video = document.createElement('video')

  document.body.appendChild(video)
  video.width = '300'
  video.height = '200'

  let stream = await navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true
    })
    .then(stream => {
      video.srcObject = stream
      return new Promise((resolve, reject) => {
        video.addEventListener('loadedmetadata', () => {
          video.play().then(() => resolve())
        })
      })
    })

  // Load the MediaPipe facemesh model assets.
  const model = await facemesh.load({
    maxFaces: 1
  })

  // Pass in a video stream to the model to obtain
  // an array of detected faces from the MediaPipe graph
  const faces = await model.estimateFaces(video)

  // Each face object contains a `scaledMesh` property,
  // which is an array of 468 landmarks.

  const container = document.querySelector('body')
  const canvas = document.createElement('canvas')
  canvas.height = 300
  canvas.width = 500

  container.appendChild(canvas)

  global.scene = new THREE.Scene()
  global.cam = new THREE.PerspectiveCamera(
    60,
    canvas.width / canvas.height,
    0.1,
    1200
  )
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas
  })

  renderer.setSize(canvas.width, canvas.height)
  renderer.setClearColor(0x000000, 1.0)

  let controls = new OrbitControls(cam, renderer.domElement)

  let mat = new THREE.MeshNormalMaterial({
    wireframe: true
  })

  // console.log(new THREE.DodecahedronGeometry(10).vertices)

  cam.position.set(440.8463520128364, 383.853920681794, -184.16499376969784)

  console.log(faces[0])

  let vertices = faces[0].scaledMesh.map(vert => new THREE.Vector3(...vert))

  console.log(vertices)

  let geo = new ConvexGeometry(vertices)

  let faceObject = new THREE.Mesh(geo, mat)

  console.log(faceObject)

  scene.add(faceObject)

  function loop() {
    controls.update()
    renderer.render(scene, cam)
    requestAnimationFrame(loop)
  }
  loop()
})()
