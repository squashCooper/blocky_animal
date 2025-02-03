//citation: https://www.songho.ca/opengl/gl_cylinder.html 
//https://cse.taylor.edu/~jdenning/classes/cos350/slides/08_Cylinders.html#sect002



class Cylinder {
    constructor() {
        this.type = 'cylinder';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.segments = 32; 
    }

    render() {
        var rgba = this.color;
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        //for curved sufrace
        for(let i = 0; i < this.segments; i++) {
            let angle1 = (i / this.segments) * Math.PI * 2;
            let angle2 = ((i + 1) / this.segments) * Math.PI * 2;

            let x1 = 0.5 * Math.cos(angle1); 
            let z1 = 0.5 * Math.sin(angle1);
            let x2 = 0.5 * Math.cos(angle2);
            let z2 = 0.5 * Math.sin(angle2);

        //set color for "sides"
            gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
            
          //front part of each segment 
            drawTriangle3D([
                x1, -0.5, z1,  // bottom left
                x1, 0.5, z1,   // top left
                x2, 0.5, z2    // top right
            ]);
            drawTriangle3D([
                x1, -0.5, z1,  // bottom left
                x2, 0.5, z2,   // top right
                x2, -0.5, z2   // bottom right
            ]);

            // top circle
            gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
            drawTriangle3D([
                0, 0.5, 0,     // center top
                x1, 0.5, z1,   // outer point 1
                x2, 0.5, z2    // outer point 2
            ]);

            // bottom circle
            gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
            drawTriangle3D([
                0, -0.5, 0,    // center bottom
                x2, -0.5, z2,  // outer point 2
                x1, -0.5, z1   // outer point 1
            ]);
        }
    }
}