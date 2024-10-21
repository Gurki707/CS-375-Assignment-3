/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
    constructor(gl, vertexShader, fragmentShader) {

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        const vertices = new Float32Array([
            // Front face
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,
            -0.5,  0.5,  0.5,
            // Back face
            -0.5, -0.5, -0.5,
            -0.5,  0.5, -0.5,
             0.5,  0.5, -0.5,
             0.5, -0.5, -0.5
        ]);

        // Defining the colors for each vertex (8 unique colors)
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

        // Indices for the 12 triangles (2 triangles per face, 6 faces)
        const indices = new Uint16Array([
            // Front face
            0, 1, 2,   0, 2, 3,
            // Back face
            4, 5, 6,   4, 6, 7,
            // Left face
            0, 3, 5,   0, 5, 4,
            // Right face
            1, 7, 6,   1, 6, 2,
            // Top face
            3, 2, 6,   3, 6, 5,
            // Bottom face
            0, 4, 7,   0, 7, 1
        ]);

        // Creating position attribute
        this.positionAttribute = new Attribute(gl, program, "aPosition", 3, gl.FLOAT);
        this.positionAttribute.setData(vertices);

        // Creating color attribute
        this.colorAttribute = new Attribute(gl, program, "aColor", 4, gl.FLOAT);
        this.colorAttribute.setData(colors);

        // Creating the index buffer
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);


        this.draw = () => {
            program.use();
            
            // Enabling the position and color attributes
            this.positionAttribute.enable();
            this.colorAttribute.enable();

            // Binding the index buffer and drawing the cube
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

            // Disabling the attributes after drawing
            this.positionAttribute.disable();
            this.colorAttribute.disable();
        };
    }
};
