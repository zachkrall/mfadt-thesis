let frag = `
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float u_time;

void main() {
   vec2 st = vUv;
   vec3 color = vec3(1.0 - st.y, 0.5, 1.0 - sin(u_time * 0.1));
   gl_FragColor = vec4(color, 1.0);
 }
`
export { frag }
