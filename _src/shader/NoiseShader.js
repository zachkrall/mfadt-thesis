import { Vector2, ShaderMaterial, DoubleSide } from 'three'
import { vert } from './_vert'
import { frag } from './_frag'

const config = {
  uniforms: {
    u_time: {
      value: 0.0
    },
    u_amp: {
      value: 8.0
    },
    u_resolution: {
      value: new Vector2(0.0, 0.0)
    }
  },
  defines: {
    // This makes PI an accessible variable in our frag and vert shaders
    PI: Math.PI,
    HALF_PI: Math.PI * 0.5
  },
  wireframe: false,
  side: DoubleSide,
  vertexShader: vert,
  fragmentShader: frag
}

const NoiseShader = new ShaderMaterial(config)

export { NoiseShader }
