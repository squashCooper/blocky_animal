
//citation: https://codepen.io/dbrandt/pen/mEbqZz

class Pyramid {
    constructor() {
        this.type = 'pyramid';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render() {
        var rgba = this.color;
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // square base 
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
        drawTriangle3D([
            0,0,0,  // bottom left
            1,0,0,  // bottom right
            1,0,1   // top right
        ]);
        drawTriangle3D([
            0,0,0,  // bottom left
            1,0,1,  // top right
            0,0,1   // top left
        ]);

        // front face
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        drawTriangle3D([
            0,0,0,  // bottom left
            1,0,0,  // bottom right
            0.5,1,0.5  // top point
        ]);

        // right face 
        gl.uniform4f(u_FragColor, rgba[0]*0.85, rgba[1]*0.85, rgba[2]*0.85, rgba[3]);
        drawTriangle3D([
            1,0,0,  // bottom right
            1,0,1,  // back right
            0.5,1,0.5  // top point
        ]);

        // back face
        gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
        drawTriangle3D([
            1,0,1,  // back right
            0,0,1,  // back left
            0.5,1,0.5  // top point
        ]);

        // left face
        gl.uniform4f(u_FragColor, rgba[0]*0.6, rgba[1]*0.6, rgba[2]*0.6, rgba[3]);
        drawTriangle3D([
            0,0,1,  // back left
            0,0,0,  // bottom left
            0.5,1,0.5  // top point
        ]);
    }
}