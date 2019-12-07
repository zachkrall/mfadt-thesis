import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import Stats from './jsm/libs/stats.module.js';

import { Shader as myshader } from './shader.js';
import Agent from './agent.js';

import './style.css';


let mouse = {x: 0, y: 0};
let container = document.body;
global.stats = new Stats();

global.THREE = THREE;
global.width  = window.innerWidth;
global.height = window.innerHeight;
global.resetBuffer = true;

global.scene    = new THREE.Scene();
global.camera   = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
let WebGLOptions = {
	alpha: false,
	autoClear: resetBuffer,
	preserveDrawingBuffer: true
};
global.renderer = new THREE.WebGLRenderer(WebGLOptions);

/* Renderer */
renderer.setClearColor( 0x1a1a1a, 1 );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = resetBuffer;
renderer.setSize(width, height);
renderer.clear(resetBuffer);
container.appendChild(renderer.domElement);
container.appendChild(stats.dom);
global.clear = () => renderer.clear();

global.camerareset = () => {
	camera.position.set(-20,0,20);
}
camerareset();

/* Camera Controls */
global.controls  = new OrbitControls(camera, renderer.domElement);
controls.update();


/* Draw Scene Here */
global.shader = myshader;
const shaderConfig = {
	uniforms: shader.uniforms,
	vertexShader: shader.vertexBasic,
	fragmentShader: shader.fluidFrag,
	wireframe: shader.wireframe || false,
	defines: shader.defines,
	vertexColors: THREE.VertexColors
};
shader.uniforms["u_time"].value = 0.0;
shader.uniforms[ "u_resolution" ].value = [
	window.innerWidth,
	window.innerHeight
];
global.shaderMaterial = new THREE.ShaderMaterial(shaderConfig);

const wireframe = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	wireframe:true,
	transparent: true,
	opacity: 0.2
});
const plane = new THREE.PlaneBufferGeometry(10,10, 10,10);

global.floor = new THREE.Mesh(plane,wireframe);
floor.position.set(0,0,0);
scene.add(floor);

const srcmap = new THREE.MeshBasicMaterial({
	vertexColors: THREE.VertexColors
});
global.geometry = new THREE.PlaneBufferGeometry(10,10,10,10);
global.floor3 = new THREE.Mesh(geometry,srcmap);
const position = geometry.attributes.position;

const genColor = () => {
	const colors = [];
	const c = new THREE.Color();

	for ( let i = 0; i < position.count; i ++ ) {
			let width = 11;
			let x = i % width;
			let y = Math.ceil(i/width);
			let cc = (y / width);
			c.setRGB( 1.0-cc, 0.5, 0.5 );
			colors.push( c.r, c.g, c.b );
	}

	return new THREE.Float32BufferAttribute( colors, 3 );
}

geometry.addAttribute( 'color', genColor());
floor3.position.set(0,0,-10);
scene.add(floor3);

let spheres = [];
for(let num=0;num<4; num++){
		spheres.push(new Agent() );
}


spheres.forEach( sphere => {
	scene.add( sphere.getMesh() );
});

// const material = new THREE.MeshNormalMaterial();
// const box = new THREE.BoxBufferGeometry(10,10,10);
// const mesh = new THREE.Mesh(box,material);
// // scene.add(mesh);

/* Effect Pipeline */
const composer   = new EffectComposer(renderer);
const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );
// const shaderPass = new ShaderPass( passMaterial );
// composer.addPass( shaderPass );

function animate() {

	shader.uniforms["u_time"].value += 0.1;

	requestAnimationFrame( animate );
	composer.render();
	controls.update();
	stats.update();

	// console.log(floor3.material.color);

	// floor3.geometry.attributes.color = genColor();
	//
	//
	let t = shader.uniforms["u_time"].value * 0.1;
	// let pos = [ Math.cos(t)*-5, Math.sin(t)*5 ];
	// let pos = [-5, Math.sin(step)*5 ];

	// sphere.position.x = pos[0];
	// sphere.position.y = pos[1];
	//
	// let norm = [Math.floor(pos[0]+5), Math.floor(5-pos[1])];
	// //
	// // let cx = norm[0] % 10;
	// // let cy = parseInt( Math.abs( Math.floor(norm[1]+5 % 10) * cx ), 10);
	//
	// let colorarray = floor3.geometry.attributes.color.array;
	// // let coord = [
	// // 	[],[],[],[],[],[],[],[],[],[],[],[]
	// // ];
	// // for(let f=0;f<colorarray.length;f+=3){
	// //
	// // }
	//
	// let column = (norm[1] * 10 + norm[0]) % 10;
	// let row = Math.ceil(column/10);
	//
	// let h = colorarray[row * 10 + column];
	//
	// console.log("pos", norm);
	//
	// sphere.material.color = (new THREE.Color())
	// 												.setRGB(
	// 													coord[norm[1]][norm[0]].r,
	// 													coord[norm[1]][norm[0]].g,
	// 													coord[norm[1]][norm[0]].b
	// 												);

spheres[0].animate( Math.cos(t)*-5, Math.sin(t)*5, Math.sin(t*0.1)*2);
spheres[1].animate( Math.cos(t*1.1)*-5, Math.sin(t*0.8)*5, Math.cos(t*0.5)*2 );
spheres[2].animate( Math.cos(t*0.8)*-5, Math.sin(t*1.8)*5, Math.sin(t*0.9)*2 );
spheres[3].animate( Math.cos(t*0.2)*-5, Math.sin(t*2.0)*5, Math.cos(t*0.7)*2 );

spheres.forEach( s => {
	s.setRGB();
	s.colorsNeedUpdate(true);
});
// sphere.geometry.colorsNeedUpdate = true;

}
animate();

function onWindowResize() {

	global.width = window.innerWidth;
	global.height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);

}
window.addEventListener('resize', onWindowResize, false);

document.addEventListener('mousemove', function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});
