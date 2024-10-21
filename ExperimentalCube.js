/////////////////////////////////////////////////////////////////////////////
//
//  ExperimentalCube.js
//
//  A cube defined ???
//

class ExperimentalCube {
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

        // Defining the colors for each vertex
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

        // Indices for the 12 triangles (6 faces of the cube)
        const indices = new Uint16Array([
            0, 1, 2,   0, 2, 3,   // Front face
            4, 5, 6,   4, 6, 7,   // Back face
            0, 3, 5,   0, 5, 4,   // Left face
            1, 7, 6,   1, 6, 2,   // Right face
            3, 2, 6,   3, 6, 5,   // Top face
            0, 4, 7,   0, 7, 1    // Bottom face
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

        // Instance data (positions of each cube instance)
        const instanceTranslations = new Float32Array([
            2.0,  0.0,  0.0,
           -2.0,  0.0,  0.0,
            0.0,  2.0,  0.0,
            0.0, -2.0,  0.0
        ]);

        // Creating an instance attribute for the translation of each instance
        this.instanceAttribute = new Attribute(gl, program, "aInstancePosition", 3, gl.FLOAT);
        this.instanceAttribute.setData(instanceTranslations, true); // Enable instanced rendering


        this.draw = () => {
            program.use();
        
            // Enabling the position, color, and instance attributes
            this.positionAttribute.enable();
            this.colorAttribute.enable();
            this.instanceAttribute.enable();

            // Binding the index buffer and draw instances of the cube
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElementsInstanced(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0, instanceTranslations.length / 3);

            // Disabling the attributes after drawing
            this.positionAttribute.disable();
            this.colorAttribute.disable();
            this.instanceAttribute.disable();
        };
    }
};
