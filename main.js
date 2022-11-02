var gl, canvas, shaderProgram;
var horizontalSpeed, horizontalDelta;

function checkWebGL(canvas) {
    var contexts = ["webgl", "expreimental-webgl", "webkit-3d", "moz-webggl"], gl;
    for (var i = 0; i < contexts.length; i++) {
        try {
            gl = canvas.getContext(contexts[i]);
        } catch (e) {}
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
    attribute vec3 aColor;
    varying vec3 vColor;
    uniform mat4 uModel;
    uniform mat4 uView;
    uniform mat4 uProj;
    void main() {
        vColor = aColor;
        gl_PointSize = 3.0;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);

    // Fragment Shader
    var fragmentShaderCode = `
    precision highp float;
    varying vec3 vColor;
    void main() {
        float r = 0.0;
        float g = 0.0;
        float b = 1.0;
        gl_FragColor = vec4(vColor, 1.0);
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

    // MVP Setup
    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var uProj = gl.getUniformLocation(shaderProgram, "uProj");

    var modelMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    glMatrix.mat4.identity(modelMatrix);
    glMatrix.mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(70), canvas.clientWidth / canvas.clientHeight, 0.5, 50.0);

    gl.uniformMatrix4fv(uModel, gl.False, modelMatrix);
    gl.uniformMatrix4fv(uView, gl.False, viewMatrix);
    gl.uniformMatrix4fv(uProj, gl.False, projMatrix);

    // Variabel Lokal
    horizontalSpeed = 0.0258;
    horizontalDelta = 0.0;


    function render() {
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        drawR();
        drawY();
        draw5();
        draw8();
    }
    setInterval(render, 1000 / 60);
}

function drawR() {
    var n = initRBuffers();
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    gl.drawArrays(gl.TRIANGLES, 0, n);

}

function initRBuffers() {
    var vertices = new Float32Array([
        -0.95, 0.55, 1.0, 0.0, 0.15,
        -0.95, -0.55, 1.0, 0.0, 0.15,
        -0.8, -0.55, 1.0, 0.0, 0.15,

        -0.95, 0.55, 1.0, 0.0, 0.15,
        -0.8, 0.55, 1.0, 0.0, 0.15,
        -0.8, -0.55, 1.0, 0.0, 0.15,

        -0.8, 0.55, 1.0, 0.0, 0.15,
        -0.65, 0.55, 1.0, 0.0, 0.15,
        -0.8, 0.1, 1.0, 0.0, 0.15,

        -0.65, 0.55, 1.0, 0.0, 0.15,
        -0.65, 0.1, 1.0, 0.0, 0.15,
        -0.8, 0.1, 1.0, 0.0, 0.15,

        -0.65, 0.55, 1.0, 0.0, 0.15,
        -0.65, 0.1, 1.0, 0.0, 0.15,
        -0.55, 0.35, 1.0, 0.0, 0.15,

        -0.8, -0.2, 1.0, 0.0, 0.15,
        -0.7, -0.55, 1.0, 0.0, 0.15,
        -0.8, 0.1, 1.0, 0.0, 0.15,

        -0.75, 0.1, 1.0, 0.0, 0.15,
        -0.7, -0.55, 1.0, 0.0, 0.15,
        -0.8, 0.1, 1.0, 0.0, 0.15,

        -0.75, 0.1, 1.0, 0.0, 0.15,
        -0.7, -0.55, 1.0, 0.0, 0.15,
        -0.55, -0.55, 1.0, 0.0, 0.15,
    ]);
    var n = 24;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.vertexAttribPointer(
        posAttrib,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(posAttrib);

    var colorAttrib = gl.getAttribLocation(shaderProgram, 'aColor');
    gl.vertexAttribPointer(
        colorAttrib,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(colorAttrib);


    return n;
}

function drawY() {
    var n = initYBuffers();
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initYBuffers() {
    var vertices = new Float32Array([
        -0.55, 0.55, 0.5, 0.5, 1.0,
        -0.35, 0.1, 0.5, 0.5, 1.0,
        -0.37, 0.55, 0.5, 0.5, 1.0,

        -0.37, 0.55, 0.5, 0.5, 1.0,
        -0.35, 0.1, 0.5, 0.5, 1.0,
        -0.29, 0.4, 0.5, 0.5, 1.0,

        -0.02, 0.55, 0.5, 0.5, 1.0,
        -0.22, 0.1, 0.5, 0.5, 1.0,
        -0.2, 0.55, 0.5, 0.5, 1.0,

        -0.2, 0.55, 0.5, 0.5, 1.0,
        -0.22, 0.1, 0.5, 0.5, 1.0,
        -0.29, 0.4, 0.5, 0.5, 1.0,

        -0.35, 0.1, 0.5, 0.5, 1.0,
        -0.22, 0.1, 0.5, 0.5, 1.0,
        -0.29, 0.4, 0.5, 0.5, 1.0,

        -0.22, 0.1, 0.5, 0.5, 1.0,
        -0.22, -0.55, 0.5, 0.5, 1.0,
        -0.35, -0.55, 0.5, 0.5, 1.0,

        -0.35, 0.1, 0.5, 0.5, 1.0,
        -0.22, 0.1, 0.5, 0.5, 1.0,
        -0.35, -0.55, 0.5, 0.5, 1.0,

    ]);
    var n = 21;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.vertexAttribPointer(
        posAttrib,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(posAttrib);

    var colorAttrib = gl.getAttribLocation(shaderProgram, 'aColor');
    gl.vertexAttribPointer(
        colorAttrib,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(colorAttrib);
    return n;
}

function draw5() {
    var n = init5Buffers();
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    gl.drawArrays(gl.POINTS, 0, n);
    gl.drawArrays(gl.LINES, 0, n);
}

function init5Buffers() {
    var changeDirection = false;
    horizontalDelta += horizontalSpeed;
    var vertices = [
        0.35+horizontalDelta, 0.55, 0.0, 0.0, 0.0,
        0.05+horizontalDelta, 0.55, 0.0, 0.0, 0.0,
        0.05+horizontalDelta, 0.55, 0.0, 0.0, 0.0,
        0.05+horizontalDelta, 0.2, 0.0, 0.0, 0.0,
    ];
    for (let i = 0; i < 180; i++) {
        let radiansX = i * Math.PI / 180;
        let radiansY = i * Math.PI / 180;
        var x = 0.05 + Math.sin(radiansX) / 3;
        var y = -Math.cos(radiansY) / 2.8 - 0.16
        yTemp = y;
        vertices.push(x+horizontalDelta);
        vertices.push(y);
        vertices.push(0.0);
        vertices.push(0.0);
        vertices.push(0.0);

        if (x+horizontalDelta > 1 || x+horizontalDelta < -1) {
            changeDirection = true;
        }
    }
    var n = 184;
    
    if (changeDirection){
        horizontalSpeed *= -1;
        changeDirection = false;
    }

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.vertexAttribPointer(
        posAttrib,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(posAttrib);

    var colorAttrib = gl.getAttribLocation(shaderProgram, 'aColor');
    gl.vertexAttribPointer(
        colorAttrib,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(colorAttrib);
    return n;
}

function draw8() {
    var n = init8Buffers();
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    gl.drawArrays(gl.POINTS, 0, n);
    gl.drawArrays(gl.LINES, 0, n);
}

function init8Buffers() {
    var vertices = [];

    for (let i = 0; i < 180; i++) {
        var radiansX = i * Math.PI / 180;
        var radiansY = i * Math.PI / 180;
        var x = -Math.sin(radiansX) / 6 + 0.7;
        var y = -Math.cos(radiansY) / 3.5 + 0.28;
        vertices.push(x);
        vertices.push(y);
    }

    for (let i = 0; i < 180; i++) {
        var radiansX = i * Math.PI / 180;
        var radiansY = i * Math.PI / 180;
        var x = Math.sin(radiansX) / 6 + 0.7;
        var y = -Math.cos(radiansY) / 3.5 + 0.28;
        vertices.push(x);
        vertices.push(y);
    }

    for (let i = 0; i < 180; i++) {
        var radiansX = i * Math.PI / 180;
        var radiansY = i * Math.PI / 180;
        var x = -Math.sin(radiansX) / 5.4 + 0.7;
        var y = -Math.cos(radiansY) / 3.5 - 0.29;
        vertices.push(x);
        vertices.push(y);
    }

    for (let i = 0; i < 180; i++) {
        var radiansX = i * Math.PI / 180;
        var radiansY = i * Math.PI / 180;
        var x = Math.sin(radiansX) / 5.4 + 0.7;
        var y = -Math.cos(radiansY) / 3.5 - 0.29;
        vertices.push(x);
        vertices.push(y);
    }

    var n = 720;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
    if (aPosition < 0) {
        console.log('Failed to get the storage location of aPosition');
        return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    return n;
}