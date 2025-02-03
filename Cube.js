//citation: https://codepen.io/dbrandt/pen/mEbqZz


class Cube {
    constructor() {
        this.type = 'cube';
  //      this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
    //    this.size = 5.0;
     //   this.segments = 10;
        this.matrix = new Matrix4();

    }

    render() {
      //  var xy = this.position;
        var rgba = this.color;
       // var size = this.size;

        // Pass the color of a point to u_FragColor variable 
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Draw
       // var d = this.size/200.0;
       // let angleStep = 360/this.segments;
        
       // for(var angle = 0; angle < 360; angle = angle + angleStep) {
         //   let centerPt = [xy[0], xy[1]];
           // let angle1 = angle;
           // let angle2 = angle+angleStep;
            
          //  let vec1 = [Math.cos(angle1*Math.PI/180)*d, Math.sin(angle1*Math.PI/180)*d];
           // let vec2 = [Math.cos(angle2*Math.PI/180)*d, Math.sin(angle2*Math.PI/180)*d];
            
           // let pt1 = [centerPt[0] + vec1[0], centerPt[1] + vec1[1]];
            //let pt2 = [centerPt[0] + vec2[0], centerPt[1] + vec2[1]];

            // Draw triangle from center point to two points on the circle
            //drawTriangle([
              //  xy[0], xy[1],      // center point
                //pt1[0], pt1[1],    // first point on circle
                //pt2[0], pt2[1]     // second point on circle
            //]);
        //}

        //front face
       
        drawTriangle3D([0,0,0, 1,1,0, 1,0,0]);
        drawTriangle3D([0,0,0, 0,1,0, 1,1,0]);

        

        //left face
        gl.uniform4f(u_FragColor, rgba[0]*1.1, rgba[1]*1.1, rgba[2]*1.1, rgba[3]);
        drawTriangle3D([0,1,0, 0,1,1, 1,1,1]);
        drawTriangle3D([0,1,0, 1,1,1, 1,1,0]);
      


  //  top face
   gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
   drawTriangle3D([0,1,0, 0,1,1, 1,1,1]);
  drawTriangle3D([0,1,0, 1,1,1, 1,1,0]);

// back face
 gl.uniform4f(u_FragColor, rgba[0]*0.6, rgba[1]*0.6, rgba[2]*0.6, rgba[3]);
 drawTriangle3D([0,0,1, 1,1,1, 1,0,1]);
 drawTriangle3D([0,0,1, 0,1,1, 1,1,1]);

// // left face
 gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
 drawTriangle3D([0,0,0, 1,0,1, 1,0,0]);
 drawTriangle3D([0,0,0, 0,0,1, 1,0,1]);

// // right face
 gl.uniform4f(u_FragColor, rgba[0]*0.85, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
 drawTriangle3D([1,0,0, 1,1,1, 1,1,0]);
 drawTriangle3D([1,0,0, 1,0,1, 1,1,1]);

// // bottom face
gl.uniform4f(u_FragColor, rgba[0]*0.4, rgba[1]*0.4, rgba[2]*0.46, rgba[3]);
 drawTriangle3D([0,0,0, 0,1,1, 0,1,0]);
 drawTriangle3D([0,0,0, 0,0,1, 0,1,1]);
    }
}
   