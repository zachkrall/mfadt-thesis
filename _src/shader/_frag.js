let frag = `
uniform sampler2D tDiffuse;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
   vec2 st = gl_FragCoord.xy / u_resolution.xy;
   vec3 color = vec3(1.0 - st.y, 0.5, 1.0 - sin(u_time * 0.1));
   gl_FragColor = vec4(color, 1.0);
 }
`
export { frag }
