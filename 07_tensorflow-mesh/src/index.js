import { face } from './test/face.js'

import * as facemesh from '@tensorflow-models/facemesh'
import { TRIANGULATION } from './triangulation.js'

import * as THREE from 'three'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

import { BasicShader } from './shader/config.js'

import { range, map } from './utils'

const container = document.querySelector('body')

;(async () => {
  /* ----- CREATE VIDEO ELEMENT ----- */
  let video = document.createElement('video')
  video.width = '100'
  video.height = '100'
  Object.assign(video.style, {
    position: 'fixed',
    top: '20px',
    left: '20px',
    objectFit: 'cover',
    zIndex: '99'
  })
  document.body.appendChild(video)

  /* ----- CREATE VIDEO STREAM ----- */
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

  console.log('stream')
  console.log(video)

  // Load the MediaPipe facemesh model assets.
  const model = await facemesh.load({
    maxFaces: 1
  })

  // ---- dummy data ----
  // Each face object contains a `scaledMesh` property,
  // which is an array of 468 landmarks.
  global.faces = [face]

  global.canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex: '1'
  })
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
  renderer.setClearColor(0x000000, 0.0)
  //
  // // let orbit = new OrbitControls(cam, renderer.domElement)
  //
  global.mat = BasicShader

  mat.uniforms['u_time'].value = 0
  mat.uniforms['u_resolution'].value = new THREE.Vector2(
    window.innerWidth,
    window.innerHeight
  )

  cam.position.set(0, 100, -400)
  cam.lookAt(0, 0, 0)

  let geo = new THREE.Geometry()

  faces[0].scaledMesh.map((vert, index, all) => {
    let x = vert[0] - all[5][0]
    let y = vert[1] - all[5][1]
    let z = vert[2] - all[5][2]

    geo.vertices.push(new THREE.Vector3(x, y, z))
  })

  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    const points = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2]
    ]
    geo.faces.push(new THREE.Face3(...points))
  }

  global.faceObject = new THREE.Mesh(geo, mat)
  faceObject.geometry.dynamic = true
  faceObject.geometry.verticesNeedUpdate = true
  faceObject.rotation.z = Math.PI
  //
  // // faceObject.geo.computeFaceNormals()
  // // fageo.computeVertexNormals()
  //
  var axesHelper = new THREE.AxesHelper(500)
  scene.add(axesHelper)

  scene.add(faceObject)

  // scene.rotation.z = Math.PI
  // scene.rotation.y = 0.7

  async function renderPrediction() {
    // Pass in a video stream to the model to obtain
    // an array of detected faces from the MediaPipe graph
    faces = await model.estimateFaces(video, false, false)
    // console.log('new prediction')

    if (faces.length === 1) {
      // console.log(faces[0].scaledMesh.length)
      render(faces[0].scaledMesh)
    }

    requestAnimationFrame(renderPrediction)
  }
  renderPrediction()

  function render(scaledMesh) {
    // mat.uniforms['u_time'].value += 1
    // mat.wireframe = !mat.wireframe
    // mat.uniforms['u_amp'].value = Math.sin(mat.uniforms['u_time'].value) * 50
    console.log(mat.uniforms['u_amp'].value)
    scaledMesh.forEach((vert, index, all) => {
      let x = vert[0] - all[5][0]
      let y = vert[1] - all[5][1]
      let z = vert[2] - all[5][2]
      faceObject.geometry.vertices[index].x = x
      faceObject.geometry.vertices[index].y = y
      faceObject.geometry.vertices[index].z = z
    })
    faceObject.geometry.verticesNeedUpdate = true
    scene.rotation.y += 0.01
    renderer.render(scene, cam)
  }
  render(faces[0].scaledMesh)

  window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    cam.aspect = width / height
    cam.updateProjectionMatrix()

    renderer.setSize(width, height)
  })
})()
