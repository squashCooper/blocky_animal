
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix; 
  void main() {
   gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
   gl_FragColor = u_FragColor;
}`
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;


function setupWebGL(){
  canvas = document.getElementById('webgl');
  

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
  initMouseControl();
  
}

function connectVariablesToGLSL(){

   // Initialize shaders
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }


  u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  if(!u_ModelMatrix){
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;

  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotateMatrix");
  if(!u_GlobalRotateMatrix){
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;

  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}



//citation: https://math.hws.edu/eck/cs424/notes2013/webgl/cube-with-rotator.html


let isDragging = false;
let lastX = 0;

//initilizing rotation with mouse control 
function initMouseControl() {
  canvas.onmousedown = (ev) => {
      isDragging = true;
      lastX = ev.clientX;
      
  };

  canvas.onmouseup = () => {
      isDragging = false;
  };

  canvas.onmouseleave = () => {
      isDragging = false;
  };

  canvas.onmousemove = (ev) => {
   //  if (!isDragging) return;

      let deltaX = ev.clientX - lastX;
      lastX = ev.clientX;

      //normalize rotationm something is still a little glitchy
      g_globalAngle = (g_globalAngle + deltaX * 0.5) % 360;

      requestAnimationFrame(renderAllShapes);
  };
}
function updateRotationFromSlider(sliderValue) {
  g_globalAngle = parseFloat(sliderValue) % 360;
 // if (g_globalAngle < 0) g_globalAngle += 360;
  lastAngle = g_globalAngle; 
  requestAnimationFrame(renderAllShapes);
}




//tick animation function 

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime; 

function tick(){

  g_seconds = performance.now()/1000.0 - g_startTime; 
  console.log(performance.now());

  updateAnimationAngle();

  renderAllShapes();

  requestAnimationFrame(tick);

}





var g_shapesList = [];


function conversion(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return[x,y];
}

function updateAnimationAngle(){
  if(g_animate){
    g_globalHead = (20*Math.sin(g_seconds));
  g_globalTail2 = (-10*Math.sin(g_seconds)); 
  g_globalLeg = (20*Math.sin(g_seconds));
  }

}

function renderAllShapes() {
  
  
var startTime = performance.now();


var globalRotMatrix = new Matrix4().rotate(g_globalAngle,0,1,0);
gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMatrix.elements);

 
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clear(gl.DEPTH_BUFFER_BIT);



//spikes for back 
var spike1 = new Pyramid();
spike1.color = [0.8, 0.4, 1.0, 1.0]; 
spike1.matrix.setTranslate(-0.3, -0.3, 0.15);
spike1.matrix.rotate(0, 0, 1, 0);
spike1.matrix.scale(0.2, 0.4, 0.3);
spike1.render();



var spike2 = new Pyramid();
spike2.color = [0.8, 0.4, 1.0, 1.0];  
spike2.matrix.setTranslate(-0.5, -0.3, 0.15);
spike2.matrix.rotate(0, 0, 1, 0);
spike2.matrix.scale(0.2, 0.4, 0.3);
spike2.render();



var spike3 = new Pyramid();
spike3.color = [0.8, 0.4, 1.0, 1.0];  
spike3.matrix.setTranslate(-0.1, -0.3, 0.15);
spike3.matrix.rotate(0, 0, 1, 0);
spike3.matrix.scale(0.2, 0.4, 0.3);
spike3.render();




//tree 

var tree = new Cube();
tree.color = [0.6,0.3,0.0,1.0];
tree.matrix.translate(0.7,-0.73,0.2);
tree.matrix.rotate(0,1,0,0);
tree.matrix.scale(0.2,0.6,0.1);
tree.render();




var top_leaf1 = new Pyramid();
top_leaf1.color = [0.0, 0.7, 0.0, 1.0];  // Red color
top_leaf1.matrix.setTranslate(0.4, 0.0, 0.21);
top_leaf1.matrix.rotate(0, 0, 1, 0);
top_leaf1.matrix.scale(0.8, 0.3, 0.1);
top_leaf1.render();

var top_leaf2 = new Pyramid();
top_leaf2.color = [0.0, 0.7, 0.0, 1.0];  // Red color
top_leaf2.matrix.setTranslate(0.4, -0.2, 0.15);
top_leaf2.matrix.rotate(0, 0, 1, 0);
top_leaf2.matrix.scale(0.8, 0.3, 0.2);
top_leaf2.render();



//dino head 
var head = new Cube();
head.color = [0.0, 1.0, 0.6, 1.0];

head.matrix.translate(0.1, 0.2, 0.2);

head.matrix.rotate(g_globalHead,0, 0, 1); 
//copy for other elements of face
var head_mat = new Matrix4(head.matrix); 
var head_mat2 = new Matrix4(head.matrix); 
var mouth_mat = new Matrix4(head.matrix);
var eye_mat1 = new Matrix4(head.matrix); 
var eye_mat2 = new Matrix4(head.matrix); 


head.matrix.scale(0.4, 0.3, 0.2);

head.render();


//head spikes 
var head_spike1 = new Pyramid();
head_spike1.color = [0.8, 0.4, 1.0, 1.0];  
head_spike1.matrix = new Matrix4(head_mat); 
head_spike1.matrix.translate(0.2, 0.3, 0); 
head_spike1.matrix.rotate(0, 0, 1, 0); 

head_spike1.matrix.scale(0.05, 0.1, 0.1);

head_spike1.render();

var head_spike2 = new Pyramid();
head_spike2.color = [0.8, 0.4, 1.0, 1.0];  

;  


head_spike2.matrix = new Matrix4(head_mat2); 
head_spike2.matrix.translate(0.1, 0.3, 0); 
head_spike2.matrix.rotate(0, 0, 1, 0);
head_spike2.matrix.scale(0.05, 0.1, 0.1);
head_spike2.render();


//mouth 

var mouth = new Cube();
mouth.color = [0.0,0.0,0.0,1.0];
mouth.matrix = new Matrix4(mouth_mat);
mouth.matrix.translate(0.23,0.05, -0.04);
mouth.matrix.rotate(0,1,0,0);
mouth.matrix.scale(0.20,0.019,0.25);
mouth.render();



//eyes


var pupil_1 = new Cylinder();
pupil_1.color = [0.0, 0.0, 0.0, 1.0];
pupil_1.matrix = new Matrix4(eye_mat1);
pupil_1.matrix.translate(0.1, 0.2, 0.0);
pupil_1.matrix.rotate(90, 1, 0,0);  
pupil_1.matrix.scale(0.04, 0.02, 0.04);
pupil_1.render();

var pupil_2 = new Cylinder();
pupil_2.color = [0.0, 0.0, 0.0, 1.0];
pupil_2.matrix = new Matrix4(eye_mat2);
pupil_2.matrix.translate(0.1, 0.2, 0.2);
pupil_2.matrix.rotate(90, 1, 0,0);  
pupil_2.matrix.scale(0.04, 0.02, 0.04);
pupil_2.render();


//body and neck

var body = new Cube();
body.color = [0.0,1.0,0.6,1.0];
body.matrix.translate(-0.50,-0.5,0.0);
body.matrix.rotate(0,1,0,0);
body.matrix.scale(0.8,0.4,0.6);
body.render();

var neck = new Cube();
neck.color = [0.0,1.0,0.6,1.0];
neck.matrix.translate(0.15,-0.2,0.2);
neck.matrix.rotate(0,1,0,0);
neck.matrix.scale(0.12,0.55,0.2);
neck.render();


//tail stuff 
var tail = new Cube();
tail.color = [0.0,1.0,0.4,1.0];
tail.matrix.setIdentity();
tail.matrix.translate(-0.8,-0.2,0.2);
tail.matrix.rotate(g_globalTail, 0, 0, 1); 
tail.matrix.rotate(90,1,0,0); 
tail.matrix.rotate(0,0,1,0);
var new_tail = new Matrix4(tail.matrix);
//var new_tail_spike = new Matrix4(tail.matrix);
tail.matrix.scale(0.42,0.2,0.12);
tail.render();

var tail2 = new Cube();
tail2.color = [0.0, 1.0, 0.4, 1.0];
tail2.matrix = new Matrix4(new_tail);
tail2.matrix.translate(0.0, 0.0, 0.09);
tail2.matrix.rotate(-275, 0, 1, 0);
tail2.matrix.rotate(g_globalTail2, 0, 1, 0);

var new_tail2 = new Matrix4(tail2.matrix);
tail2.matrix.scale(0.4, 0.2, 0.1);
tail2.render();

var tail3 = new Cube();
tail3.color = [0.0, 1.0, 0.4, 1.0];
tail3.matrix = new Matrix4(new_tail2);
tail3.matrix.translate(0.4, 0.1, 0.9);
tail3.matrix.translate(-0.0, -0.1, -0.9);
tail3.matrix.scale(0.2, 0.2, 0.1);
tail3.matrix.rotate(-g_globalTail3, 0, 1, 0);
tail3.render();



//legs
//make one back and one front move the same
//one back and one front move oppositie so 
//it looks like it is walking 

var back_leg1 = new Cylinder();
back_leg1.color = [0.0, 0.6, 0.2, 1.0];
back_leg1.matrix.setTranslate(-0.35, -0.55, 0.1);
back_leg1.matrix.rotate(g_globalLeg, 0, 0, 1); 
back_leg1.matrix.scale(0.15, 0.3, 0.1); 
back_leg1.render(); 



var back_leg2 = new Cylinder();
back_leg2.color = [0.0, 0.3, 0.2, 1.0];
back_leg2.matrix.setTranslate(-0.35, -0.55, 0.5);
back_leg2.matrix.rotate(-g_globalLeg, 0, 0,1);  
back_leg2.matrix.scale(0.15, 0.3, 0.1);
back_leg2.render();



var front_leg1 = new Cylinder();
front_leg1.color = [0.0, 0.6, 0.2, 1.0];
front_leg1.matrix.setTranslate(0.1, -0.55, 0.1);
front_leg1.matrix.rotate(-g_globalLeg, 0,0);  
front_leg1.matrix.scale(0.15, 0.3, 0.1);
front_leg1.render();


var front_leg2 = new Cylinder();
front_leg2.color = [0.0, 0.3, 0.2, 1.0];
front_leg2.matrix.setTranslate(0.1, -0.55, 0.5);
front_leg2.matrix.rotate(g_globalLeg, 0, 0,1); 
front_leg2.matrix.scale(0.15, 0.3, 0.1);
front_leg2.render();


;

var duration = performance.now() - startTime;
sendTextToHTML("ms: " + Math.floor(duration) + "  fps: " + Math.floor(10000/duration)/10, "numbd");


}

function sendTextToHTML(text, htmlId){

var HTMLelm = document.getElementById(htmlId);

if(!HTMLelm){
  console.log("Failed to get" +htmlId);
  return;
}

HTMLelm.innerHTML = text;
}


let g_globalAngle = 0;
let g_globalLeg = 0;

let g_globalTail = 0; 
let g_globalTail2 = 0; 
let g_globalTail3 = 0; 
let g_globalHead = 0; 
let g_animate = false; 
function userInterface(){

  document.getElementById("camera_slide").addEventListener('mousemove', function() {g_globalAngle = this.value; renderAllShapes();});
  //document.getElementById("front1_slide").addEventListener('mousemove', function() {g_globalFrontLeg1 = this.value; renderAllShapes();});
  document.getElementById("tail_slide").addEventListener('mousemove', function(){g_globalTail = this.value; renderAllShapes();});
  document.getElementById("tail2_slide").addEventListener('mousemove', function() {g_globalTail2 = this.value; renderAllShapes();});
  document.getElementById("tail3_slide").addEventListener('mousemove', function(){g_globalTail3 = this.value; renderAllShapes();});
  document.getElementById("head_slide").addEventListener('mousemove', function() {g_globalHead = this.value; renderAllShapes();});
  document.getElementById("leg_slide").addEventListener('mousemove', function() {g_globalLeg = this.value; renderAllShapes();});
 // document.getElementById("join2_slide").addEventListener('mousemove', function() {g_globalJoin2 = this.value; renderAllShapes();});

  document.getElementById("animate_off").onclick = function(){g_animate = false;};
  document.getElementById("animate_on").onclick = function(){g_animate = true;};
    



}



function main() {
  // Initialize WebGL and shaders
  setupWebGL();
  connectVariablesToGLSL();
  userInterface();

 
  renderAllShapes(); 
  //drawWalter(); 

  // Set up event handlers
  // canvas.onmousedown = click;
  // canvas.onmousemove = function (ev) {
  //   if (ev.buttons === 1) {
  //     click(ev);
  //   }
  // };

  gl.clearColor(0.0,0.0,0.0,1.0);
 // renderAllShapes();

 requestAnimationFrame(tick);
}
