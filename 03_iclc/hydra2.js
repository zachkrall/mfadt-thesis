

















faceVideo = document.createElement('video');
faceVideo.autoplay = true;
faceVideo.loop = true;
faceVideo.src = atom.project.getPaths()[0] + "/media/Early CGI Facial Animation (1974)_trimmed.mp4";

s1.init({ src: faceVideo, dynamic: true });

namesImage = document.createElement('img');
namesImage.src = atom.project.getPaths()[0] + "/media/names.png";
s2.init({ src: namesImage, dynamic: false });

faceMesh = document.createElement('video');
faceMesh.autoplay = true;
faceMesh.loop = true;
faceMesh.src = atom.project.getPaths()[0] + "/media/tracker.mp4";

s3.init({ src: faceMesh, dynamic: true });

s1.initScreen(1)

// ---
a.show();

src(s3)
// .diff(
//   osc(3, 0.1, 900)
// )
// .saturate(0)
.modulatePixelate(o0)
.modulateScale(
  noise(.4), ()=>Math.sine(time)
)
.diff(
  s3
)
// .mult(
//   o1().modulateScale(l1().scrollX(0,0.1)), 0.5
// )
// .mult(
//   s3
// )
.out();


l1 = () => shape(
    6, 0.8, 0
  )
  .scrollX(0.5)
  .scale(1.9, 1);


o1 = () => osc(200, 0.0)
  .thresh()
  .rotate(
    () => Math.PI * 90 / 180
  );


colorShift = [
  [1, 0, 0, 1, 0, 0, 0.5],
  [0, 1, 0, 0, 1, 0, 0.5],
  [0, 0, 1, 0, 0, 1, 0.5]
];


shape1 = x =>
  shape(3, [0.9, 0.5], x ? x : 0)
  .rotate([
    Math.PI * 90 / 180,
    0
  ])
  .scrollX(0, 0.1);



face = () => src(s1).thresh(0.4)

faceMesh = () => src(s3)

names = () => src(s2)


bpm(130)

names()
.modulate(
  noise([10,1,0,100])
)
.diff(
  faceMesh().scale(0.8, 0.7)
)
.mult(
  osc(
  [60,0,0,0]
  )
  .color(1,0,0)
)
.out()

solid(...colorShift)
.mult(
  osc(900,0.01).thresh()
  .mult(
    osc(900,0.01).rotate(()=>Math.PI * 90 / 180).thresh()
  )
  .modulateScale(
    shape(40, 0.2, 0.2)
  )
)
.mult(
  shape(40, 0.6)
)
.scale(1,0.8)
.scale(2)
.modulate(
  noise(2)
)
.repeat([1,1,1,4],[1,1,1,4])
.add(
  names()
  .modulate(
    noise([10,1,0,100])
  ), 2
)
.saturate(
  100
)
.diff(
  src(o0).scale(0.8, 0.8).invert()
)
.invert()
.out()

solid(1,1,1)
.mult(
  osc(2000,-0.02).thresh()
  .mult(
    osc(2000,-0.02).rotate(()=>Math.PI * 90 / 180).thresh()
  )
  .modulateScale(
    shape(40, 0.1, 0.6), 6
  )
)
.mult(
  shape(40, 0.5)
)
.scale(1,0.8)
.modulate(o0)
.scale(()=>a.fft[0]+0.8)
.blend(
  solid(1,0,1)
  .diff(
    src(o0).invert()
  ), ()=>Math.floor(a.fft[0]+0.5)
)
// .modulate(
//   shape(2)
//   .color(1,0,1)
//   .rotate(0,0.1)
//   .scale(1.5,0.8)
//   .modulateScale(
//     osc(3).thresh()
//   ), 3
// )
// .diff(
//   shape(5)
//   .color(0,1,0)
//   .rotate(0,0.1)
//   .scale(1.5,0.8)
//   .modulateScale(
//     osc(3).thresh()
//   )
//   .scale(()=>a.fft[0]+0.2), 3
// )
.colorama()
.color(1,0,1)
.add(
  src(s0).modulate(o0).modulateScale(osc(3)), 0.1
)
.repeat([1,1,1,2],[1,1,1,2])
.out()

solid().add(solid(0,0,1),9).out()

solid().out()

s0.initScreen(1)


solid().out();



solid()
.diff(
  face()
  .diff(
    l1()
    .mult(o1())
    .diff(l1().scrollX(0.5, 0.1))
    .diff(l1().scrollY(0, -0.1))
    .diff(osc().thresh())
    .modulateScale(shape1(() => Math.sin(time)).scrollX(0, 0.1), ()=>a.fft[1])
  )
)
.out();



// LINES
l1()
  .mult(o1())
  .diff(l1().scrollX(0.5, 0.1))
  .diff(l1().scrollY(0, -0.1))
  .diff(osc().thresh())
  .modulateScale(shape1(() => Math.sin(time)).scrollX(0, 0.1), ()=>a.fft[2])
  .diff(
    face()
  )
  .add(gradient())
  .saturate(10)
  .color(...colorShift)
  .out(o0);


osc(10, 0.1, ()=>Math.sin(time))
.add(noise(999, 10))
.modulateScale(
  face()
)
.modulate(o0)
.diff(
  names()
)
.out();





face()
.out();

// GRADIENT FACES

.modulateHue(
  l1(), 10
)
.modulate(o0, ()=>a.fft[1]*5.0)
.add(
  noise(999, 10.0)
)
.saturate(2)
.mult(osc(2,0.9,99))
// .color(0.5,0.2,1.0)
.color(...colorShift)
// .repeatX([1,2,1,4])
// .repeatY([1,2,1,4])
// .modulate(o0, ()=>a.fft[1]*5.0)
// .saturate(10)
.modulateScale(
  l1()
    .mult(o1())
    .diff(l1().scrollX(0.5, 0.1))
    .diff(l1().scrollY(0, -0.1))
    .diff(osc().thresh())
    .modulateScale(shape1(() => Math.sin(time)).scrollX(0, 0.1), ()=>a.fft[2]), ()=>Math.sin(time)
)
.diff(
  face()
  .pixelate(
    [50, 10, 1000000]
  )
)
.out()

// CLEAR
solid().out();


// INFINITE
colorShift = [
  [0, 1, 0, 0.5],
  [0, 1, 1, 0],
  [0, 1, 0, 0.5]
];

face()
.diff(
  src(o0).scale(()=>Math.sin(time)*0.1 + 0.9)
)
.add(shape1()).invert()
.diff(noise(0.1).thresh())
.modulateScale(
  l1().scrollX(0,0.1).modulateScale(o1()), ()=>mouse.x/window.innerWidth * 2
)
.saturate(10)
.scale(()=>a.fft[1]+0.5)
.out(o0);

solid(0).out();

// .add(shape1()).invert()
//
// .diff(noise(0.1).thresh())
// .out();
//
// .modulateScale(
//   l1().scrollX(0,0.1).modulateScale(o1()), ()=>mouse.x/window.innerWidth * 10
// )
// .saturate(10)
// .scale(()=>a.fft[1]+0.5)
// .out();


face()
.repeatX([4,1])
.repeatY([4,1])
.add(
  gradient()
)
.color(...colorShift)
.saturate(10)
.blend(o0)
.out();
