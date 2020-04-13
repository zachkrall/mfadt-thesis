import Sketch from "./sketch.js";
import Hydra from "hydra-synth";

let sketch = new Sketch(
  document.getElementById("sketch"),
  window.innerWidth,
  window.innerHeight
);

sketch.setup();
sketch.addResizeListener();

const loop = () => {
  sketch.loop();
  requestAnimationFrame(loop);
};

loop();

// let hydra = new Hydra({
//   canvas: document.getElementById("hydra-synth"),
//   detectAudio: false,
//   width: 1200,
//   height: 720,
//   makeGlobal: false
// });
//
// hydra.osc().out();
