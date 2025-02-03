class Triangle{
    constructor(){
        this.type = 'triangle';
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
        this.rotation = 0; //new rotation aspect 
    }
  
    //citation for rotation: https://www.youtube.com/watch?v=mRrsGDIpfzc and https://webglfundamentals.org/webgl/lessons/webgl-2d-rotation.html
  
    render(){
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;
  
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniform1f(u_Size, size);
  
        // get triangle vertices to prepare for rotation 
        var d = this.size/200.0;
        var originalVertices = [
            xy[0], xy[1],       // Point 1
            xy[0] + d, xy[1],   // Point 2
            xy[0], xy[1] + d    // Point 3
        ];
  
        //center pt for rotations 
        var centerX = xy[0] + d/2;
        var centerY = xy[1] + d/2;
  
        // convert to radians 
        var angleInRadians = this.rotation * Math.PI / 180;
  
        // rotate each vertex
        var rotatedVertices = [];
        for(var i = 0; i < originalVertices.length; i += 2) {
            // translate to origin
            var x = originalVertices[i] - centerX;
            var y = originalVertices[i+1] - centerY;
  
            // rotate
            var rotatedX = x * Math.cos(angleInRadians) - y * Math.sin(angleInRadians);
            var rotatedY = x * Math.sin(angleInRadians) + y * Math.cos(angleInRadians);
  
            //translate back 
            rotatedVertices.push(rotatedX + centerX);
            rotatedVertices.push(rotatedY + centerY);
        }
  
        
        drawTriangle(rotatedVertices);
    }
  }
  function drawTriangle(vertices){
      var n = 3; 
  
  
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  
    //var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   // if (a_Position < 0) {
    //  console.log('Failed to get the storage location of a_Position');
     // return -1;
   // }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  function drawTriangle3D(vertices){
    var n = 3; 


  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  //var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
 // if (a_Position < 0) {
  //  console.log('Failed to get the storage location of a_Position');
   // return -1;
 // }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}