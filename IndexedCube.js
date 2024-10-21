/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        // Defining the 8 unique vertices of the cube
        const vertices = new Float32Array([
            // Front face
            -0.5, -0.5,  0.5,   // 0
             0.5, -0.5,  0.5,   // 1
             0.5,  0.5,  0.5,   // 2
            -0.5,  0.5,  0.5,   // 3
            // Back face
            -0.5, -0.5, -0.5,   // 4
             0.5, -0.5, -0.5,   // 5
             0.5,  0.5, -0.5,   // 6
            -0.5,  0.5, -0.5    // 7
        ]);

        // Defining the colors for each vertex (one color per vertex)
        const colors = new Float32Array([
            1.0, 0.0, 0.0, 1.0,  // Red
            0.0, 1.0, 0.0, 1.0,  // Green
            0.0, 0.0, 1.0, 1.0,  // Blue
            1.0, 1.0, 0.0, 1.0,  // Yellow
            1.0, 0.0, 1.0, 1.0,  // Magenta
            0.0, 1.0, 1.0, 1.0,  // Cyan
            1.0, 0.5, 0.0, 1.0,  // Orange
            0.5, 0.0, 0.5, 1.0   // Purple
        ]);

        // Defining the index buffer for 12 triangles (2 triangles per face)
        const indices = new Uint16Array([
            // Front face
            0, 1, 2,   0, 2, 3,
            // Back face
            4, 5, 6,   4, 6, 7,
            // Left face
            0, 3, 7,   0, 7, 4,
            // Right face
            1, 5, 6,   1, 6, 2,
            // Top face
            3, 2, 6,   3, 6, 7,
            // Bottom face
            0, 4, 5,   0, 5, 1
        ]);

        // Creating position attribute
        this.positionAttribute = new Attribute(gl, program, "aPosition", 3, gl.FLOAT);
        this.positionAttribute.setData(vertices);

        // Creating color attribute
        this.colorAttribute = new Attribute(gl, program, "aColor", 4, gl.FLOAT);
        this.colorAttribute.setData(colors);

        // Creating index buffer
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        this.draw = () => {
            program.use();
         
            // Enabling the position and color attributes
            this.positionAttribute.enable();
            this.colorAttribute.enable();

            // Binding the index buffer and draw the indexed cube
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

            // Disabling the attributes after drawing
            this.positionAttribute.disable();
            this.colorAttribute.disable();
        };
    }
};
