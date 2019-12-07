import * as THREE from 'three';

export default class Agent {

  constructor(){
    this.color = 0x00ff00;

    this.geo = new THREE.SphereBufferGeometry(0.5,10,10);
    this.mat = new THREE.MeshBasicMaterial({
      color: this.color
    });
    this.mesh = new THREE.Mesh(this.geo,this.mat);
    this.mesh.dynamic = true;

    this.x = 0;
    this.y = 0;
  }

  getMesh(){
    return this.mesh;
  }

  animate( _x, _y, _z ){
    this.x = _x;
    this.y = _y;
    this.mesh.position.set(_x, _y, _z);
  }

  colorsNeedUpdate( bool ){
    this.geo.colorsNeedUpdate = bool;
  }

  setRGB(){
    this.mesh.material.color = (new THREE.Color()).setRGB( (this.y+5)*0.1,0.5,0.5);
    // this.mesh.material.color = (new THREE.Color()).setRGB(r,g,b);
  }

}
