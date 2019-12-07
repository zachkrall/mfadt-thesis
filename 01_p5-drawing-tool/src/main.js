import p5 from 'p5';

import './style.css';

let fill = [255,0,0];

let shared_draw = (p, mX, mY, radius, time) => {

  let amp = Math.sin(time) * 100;
  p.fill(fill);

  p.ellipse(  (mX + Math.sin(time) * amp),
              (mY + Math.cos(time) * amp),
              radius,
              radius);
  p.ellipse(  (mX + Math.sin(time*1.1) * amp),
              (mY + Math.cos(time*1.8) * amp),
              radius,
              radius);
  p.ellipse(  (mX + Math.sin(time*0.8) * amp),
              (mY + Math.cos(time*1.8) * amp),
              radius,
              radius);
}

const sketch = (p) => {

  let time = 0,
      mX   = 0,
      mY   = 0;

  let radius = 15;
  let mouseIsPressed = false;

  p.setup = () =>{
    let canvas = p.createCanvas(400,400);
    canvas.parent(document.querySelector('#canvas'));
    p.background(0);
    canvas.mousePressed(()=>p.mouseVal(true));
  }

  p.mouseVal = (val) => {
    mouseIsPressed = val;
  }

  p.mouseReleased = () => {
    p.mouseVal(false);
  }

  p.draw = () =>{
    // background(220);
    p.noStroke();
    // fill(Math.sin(time)*255);
    let fade = p.color('rgba(0,0,0,0.05)');

    p.background(fade);

    if(mouseIsPressed){
      shared_draw(p, mX, mY, radius, time);
    }

    let easing = 0.05;
    mX = mX + ((p.mouseX - mX) * easing);
    mY = mY + ((p.mouseY - mY) * easing);

    o.mouseVal(mouseIsPressed);
    o.mouseCoord({
      x: mX,
      y: mY
    });
    o.time(time);

    time+=0.01;
  }
  p.clearCanvas = () => {
    p.background(0);
  }
}

const output = (p) => {
  let mouseIsPressed = false;
  let mX = 0, mY = 0;
  let time = 0;
  let radius = 15;

  let bg = 240;

  p.setup = () => {
    let canvas = p.createCanvas(400,400);
    canvas.parent(document.querySelector('#canvas'));
    p.background(bg);
    p.noStroke();
  }
  p.draw = () => {
    if(mouseIsPressed){
      shared_draw(p, mX, mY, radius, time);
    }
  }
  p.mouseVal = (val) => {
    mouseIsPressed = val;
  }
  p.mouseCoord = (val) => {
    mX = val.x;
    mY = val.y;
  }
  p.time = (t) => {
    time = t;
  }
  p.clearCanvas = () => {
    p.background(bg);
  }
}

let s = new p5(sketch);
let o = new p5(output);


document.querySelector('#resetButton').addEventListener('click', ()=>{
  s.clearCanvas();
  o.clearCanvas();
});
document.querySelector('#changeColor').addEventListener('click', ()=>{
  fill = [
    Math.random(), Math.random(), Math.random()
  ].map( i => i * 255 );

  let view = document.querySelector('#colorView');

  view.style.background = `rgba(${fill.join(', ')}, 1.0)`;
  view.style.borderColor = `rgba(${fill.join(', ')}, 1.0)`;
});
