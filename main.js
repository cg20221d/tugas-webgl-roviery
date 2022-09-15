var gl, canvas, shaderProgram;

function checkWebGL(canvas) {
    var contexts = ["webgl", "expreimental-webgl", "webkit-3d", "moz-webggl"], gl;
    for (var i = 0; i < contexts.length; i++) {
        try {
            gl = canvas.getContext(contexts[i]);
        } catch (e) { }
        if (gl) {
            break;
        }
    }
    if (!gl) {
        alert("WebGL not available, sorry! Please use a new version of Chrome or Firefox.");
    }
    return gl;
}

function main() {
    var canvas = document.getElementById("my-canvas");
    gl = checkWebGL(canvas);

    // Vertex Shader
    var vertexShaderCode = `
    attribute vec2 aPosition;
    void main() {
        float x = aPosition.x;
        float y = aPosition.y;
        gl_PointSize = 3.0;
        gl_Position = vec4(x,y,0.0,1.0);
    }`;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);


    // Fragment Shader
    var fragmentShaderCode = `
    precision highp float;
    void main() {
        float r = 0.0;
        float g = 0.0;
        float b = 1.0;
        gl_FragColor = vec4(r, g, b, 1.0);
    }
    `;
    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);


    // Shader Program
    shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.clearColor(0.4, 0.7, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    drawR();
    // drawY();
}

function drawR() {
    var n = initRBuffers();
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    gl.drawArrays(gl.POINTS, 0, n);
    gl.drawArrays(gl.TRIANGLES, 0, n);
    
}

function initRBuffers() {
    var vertices = new Float32Array([
        -0.95, 0.0,     
        -0.95, -0.75,   
        -0.65, -0.75,   

        -0.95, 0.75,    
        -0.95, 0.15,     
        -0.6, -0.75,   

        -0.95, 0.75,   
        -0.6, -0.75,
        -0.38, -0.75,

        -0.9, 0.75,
        -0.45, 0.75,
        -0.675, 0.15,
    ]);
    var n = 12;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
    if (aPosition < 0) {
        console.log('Failed to get the storage location of aPosition');
        return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    return n;
}

function drawY() {
    var n = initYBuffers();
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    gl.drawArrays(gl.POINTS, 0, n);
    gl.drawArrays(gl.LINE_LOOP, 0, n);
}

function initYBuffers() {
    var vertices = new Float32Array([
        -0.55, 0.75,     // 1
        -0.32, 0.1,     // 2
        -0.32, -0.75,   // 3
        -0.15, -0.755,   // 4
        -0.15, 0.1,      // 5
        0.08, 0.75,     // 6
        -0.1, 0.75,    // 7
        -0.235, 0.4,    // 8
        -0.37, 0.75     // 9

    ]);
    var n = 9;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
    if (aPosition < 0) {
        console.log('Failed to get the storage location of aPosition');
        return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    return n;
}

