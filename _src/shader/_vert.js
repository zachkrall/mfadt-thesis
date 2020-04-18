let vert = `
uniform float u_time;
uniform float u_amp;

void main() {
  vec3 newPosition = position + vec3(0., 0., sin(u_time + position.x)*u_amp);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

`
export { vert }
