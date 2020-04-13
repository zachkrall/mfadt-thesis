import * as THREE from "three";
import { Functions as func } from "./shader-funcs.js";

const Shader = {
  uniforms: {
    u_time: {
      value: 0.0
    },
    u_resolution: {
      value: new THREE.Vector2()
    },
    amp: {
      value: 0.0
    },
    tDiffuse: { value: null }
  },

  defines: {
    PI: Math.PI,
    HALF_PI: Math.PI * 0.5
  },

  wireframe: false,

  vertexBasic: `
varying vec2 vUv;

void main(){
    vUv = uv;
    gl_Position = projectionMatrix
                  * modelViewMatrix
                  * vec4(position, 1.0);
}
`,
  vertexShader: `
uniform float u_time;
varying vec2 vUv;
uniform float amp;

${func.noise}

void main(){
    vUv = uv;
    vec3 directionVec = normalize(position);
    vec3 newPosition  = directionVec;

    vec3 nice_time = vec3(u_time*10000000.);

    newPosition.x = sin( noise(directionVec + nice_time) * 02.5 ) * sin(u_time) * amp;
    newPosition.y = sin( noise(directionVec + nice_time) * 01.0 ) * sin(u_time) * amp;
    newPosition.z = sin( noise(directionVec + nice_time) * 0.50 ) * sin(u_time) * amp;

    gl_Position = projectionMatrix
                * modelViewMatrix
                * vec4(newPosition+position, 1.0);
}
`,
  fragmentShader: `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 vUv;

void main(){

  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec3 color = vec3( 0.3, st.x, st.y * sin(u_time*2.));

  gl_FragColor = vec4(color, 1.0);
}
`,
  fragmentShader_Prev: `
    uniform vec2 u_resolution;
    uniform float u_time;
    varying vec2 vUv;
    uniform sampler2D tDiffuse;

    vec2 modulate(vec2 st, vec4 c1, float amount){
        return vec2(st + c1.x*amount);
    }

    void main() {
    //vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 st = vUv;

    float len = length( vec2(0.5)-st );

    //   st.x += st.x + u_time * -0.1;
    //   st.y += st.y + u_time * 0.1;

    //st.x = fract(st.x * (sin(u_time*0.05)+2.)*3.) + length(0.5-st.x) * sin(u_time*0.5) * 1.;
    //st.y = fract(st.y * (sin(u_time*0.04)+2.)*3.) + length(0.5-st.y) * cos(u_time*0.2) * 1.;

       st.x = fract( st.x-len * -10.2 );
       st.y = fract( st.y-len * -3.2 );

   //  st.x = fract (st.x * 50.) - len;
   //st.y = fract (st.y * 50.) - len;

    // Repeat
    //st.x += u_time * 0.1;
    //st.y += u_time * 0.2;

    //st.x = fract(st.x-len * sin(u_time * 0.2));
    //st.y = fract(st.y-len * 2.);

    // st.x = st.x - len;
    // st.y = st.y - len;

      vec4 previousPassColor = texture2D(tDiffuse, st);
    //   vec4 feedbackColor     = texture2D(tDiffuse, feedback);

      vec3 color = vec3(0.);

    //   vec3 color2 = vec3(
    //         sin(st.x+u_time*0.5),
    //         sin(st.y*3.5),
    //         cos(st.y*2.0)
    //  );

    vec3 color2 = vec3(
        cos(u_time),sin(u_time),1.0
    );

     color = vec3(0.0);

     color = color + vec3(
         previousPassColor.r,
         previousPassColor.g,
         previousPassColor.b
    );

      gl_FragColor = vec4(
         color,
          0.1
        );
    }
`,
  fragmentShader_Lines: `
    uniform vec2 u_resolution;
    uniform float u_time;

    varying vec2 vUv;

    void main() {
    //   vec2 st = gl_FragCoord.xy/u_resolution;

    vec2 st = vUv;
    st.y = st.y + u_time * 0.01;
    float pos = fract(st.y * 60.0);

    vec3 color = vec3(pos);

    gl_FragColor = vec4(color, 1.0);

    // gl_FragColor = vec4(1.0);
    }
    `
};

export { Shader };
