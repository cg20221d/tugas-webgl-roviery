var gl, kanvas, shaderProgram;
var uModel, uView, uProjection, view, proj, model;
var thetaYSpeed = 0.0;
var thetaY = 0.0;
var thetaXSpeed = 0.0;
var thetaX = 0.0;
var cubeHorizontalDelta = 0.0;
var cubeHorizontalSpeed = 0.0;
var cubeZDelta = 0.0;
var cubeZSpeed = 0.0;
var horizontalDelta = 0.0;
var horizontalSpeed = 0.0258;
var scaleSpeed = 0.0258;
var scale = 0.5;

var vertices = [
    /* === R === */
    // front
    -2.5, -1, 4, 1, 1, 0,      // Index: 0
    -2.5, 1, 4, 1, 1, 0,      // Index: 1
    -2.1, 1, 4, 1, 1, 0,      // Index: 2
    -2.1, -1, 4, 1, 1, 0,      // Index: 3
    -2.1, 0, 4, 1, 1, 0,      // Index: 4
    -1.7, 1, 4, 1, 1, 0,      // Index: 5
    -1.7, 0, 4, 1, 1, 0,      // Index: 6
    -2.1, -0.6, 4, 1, 1, 0,      // Index: 7
    -1.9, -1, 4, 1, 1, 0,      // Index: 8
    -1.5, -1, 4, 1, 1, 0,      // Index: 9

    // left
    -2.5, -1, 3.5, 0, 1, 1,      // Index: 10 
    -2.5, 1, 3.5, 0, 1, 1,      // Index: 11
    -1.9, -1, 3.5, 0, 1, 1,      // Index: 12
    -2.1, -0.6, 3.5, 0, 1, 1,      // Index: 13

    // top
    -1.7, 1, 3.5, 0, 1, 1,      // Index: 14

    // right
    -1.7, 0, 3.5, 0, 1, 1,      // Index: 15
    -2.1, 0, 3.5, 0, 1, 1,      // Index: 16
    -1.5, -1, 3.5, 0, 1, 1,      // Index: 17
    -2.1, -0.6, 3.5, 0, 1, 1,      // Index: 18
    -2.1, -1, 3.5, 0, 1, 1,      // Index: 19

    // back
    -2.5, -1, 3.5, 0, 1, 1,    // Index: 20
    -2.5, 1, 3.5, 0, 1, 1,    // Index: 21
    -2.1, 1, 3.5, 0, 1, 1,    // Index: 22
    -2.1, -1, 3.5, 0, 1, 1,    // Index: 23
    -2.1, 0, 3.5, 0, 1, 1,    // Index: 24
    -1.7, 1, 3.5, 0, 1, 1,    // Index: 25
    -1.7, 0, 3.5, 0, 1, 1,    // Index: 26
    -2.1, -0.6, 3.5, 0, 1, 1,    // Index: 27
    -1.9, -1, 3.5, 0, 1, 1,    // Index: 28
    -1.5, -1, 3.5, 0, 1, 1,    // Index: 29

    /* === Y === */
    // front
    -1.0, -1, 4, 1, 1, 0,    // Index: 30
    -0.5, -1, 4, 1, 1, 0,    // Index: 31
    -1.0, 0, 4, 1, 1, 0,    // Index: 32
    -0.5, 0, 4, 1, 1, 0,    // Index: 33
    -1.5, 0.7, 4, 1, 1, 0,    // Index: 34
    -1.15, 1, 4, 1, 1, 0,    // Index: 35
    -0.35, 1, 4, 1, 1, 0,    // Index: 36
    0, 0.7, 4, 1, 1, 0,    // Index: 37
    -0.75, 0.4, 4, 1, 1, 0,    // Index: 38

    // left
    -1, -1, 3.5, 0, 1, 1,    // Index: 39
    -1, 0, 3.5, 0, 1, 1,    // Index: 40

    // top
    -1.5, 0.7, 3.5, 0, 1, 1,    // Index: 41
    -1.15, 1, 3.5, 0, 1, 1,    // Index: 42
    -0.75, 0.4, 3.5, 0, 1, 1,    // Index: 43
    -0.35, 1, 3.5, 0, 1, 1,    // Index: 44
    0, 0.7, 3.5, 0, 1, 1,    // Index: 45

    // right
    -0.5, 0, 3.5, 0, 1, 1,    // Index: 46
    -0.5, -1, 3.5, 0, 1, 1,    // Index: 47

    // back
    -1, -1, 3.5, 0, 1, 1,    // Index: 48
    -0.5, -1, 3.5, 0, 1, 1,    // Index: 49
    -1, 0, 3.5, 0, 1, 1,    // Index: 50
    -0.5, 0, 3.5, 0, 1, 1,    // Index: 51
    -1.5, 0.7, 3.5, 0, 1, 1,    // Index: 52
    -1.15, 1, 3.5, 0, 1, 1,    // Index: 53
    -0.35, 1, 3.5, 0, 1, 1,    // Index: 54
    0, 0.7, 3.5, 0, 1, 1,    // Index: 55
    -0.75, 0.4, 3.5, 0, 1, 1,    // Index: 56

    /* === 5 === */
    // front
    0.1, -1, 4, 1, 1, 0,    // Index: 57
    0.7, -1, 4, 1, 1, 0,    // Index: 58
    0.1, -0.6, 4, 1, 1, 0,    // Index: 59
    0.7, -0.6, 4, 1, 1, 0,    // Index: 60
    1.1, -1, 4, 1, 1, 0,    // Index: 61
    1.1, 0.3, 4, 1, 1, 0,    // Index: 62
    0.7, 0.3, 4, 1, 1, 0,    // Index: 63
    0.7, -0.1, 4, 1, 1, 0,    // Index: 64
    0.1, -0.1, 4, 1, 1, 0,    // Index: 65
    0.1, 0.3, 4, 1, 1, 0,    // Index: 66
    0.5, 0.3, 4, 1, 1, 0,    // Index: 67
    0.1, 1, 4, 1, 1, 0,    // Index: 68
    0.5, 1, 4, 1, 1, 0,    // Index: 69
    0.5, 0.6, 4, 1, 1, 0,    // Index: 70
    1.1, 1, 4, 1, 1, 0,    // Index: 71
    1.1, 0.6, 4, 1, 1, 0,    // Index: 72

    // back
    0.1, -1, 3.5, 0, 1, 1,    // Index: 73
    0.7, -1, 3.5, 0, 1, 1,    // Index: 74
    0.1, -0.6, 3.5, 0, 1, 1,    // Index: 75
    0.7, -0.6, 3.5, 0, 1, 1,    // Index: 76
    1.1, -1, 3.5, 0, 1, 1,    // Index: 77
    1.1, 0.3, 3.5, 0, 1, 1,    // Index: 78
    0.7, 0.3, 3.5, 0, 1, 1,    // Index: 79
    0.7, -0.1, 3.5, 0, 1, 1,    // Index: 80
    0.1, -0.1, 3.5, 0, 1, 1,    // Index: 81
    0.1, 0.3, 3.5, 0, 1, 1,    // Index: 82
    0.5, 0.3, 3.5, 0, 1, 1,    // Index: 83
    0.1, 1, 3.5, 0, 1, 1,    // Index: 84
    0.5, 1, 3.5, 0, 1, 1,    // Index: 85
    0.5, 0.6, 3.5, 0, 1, 1,    // Index: 86
    1.1, 1, 3.5, 0, 1, 1,    // Index: 87
    1.1, 0.6, 3.5, 0, 1, 1,    // Index: 88

    /* === 8 === */
    // front
    1.2, -1, 4, 1, 1, 0,    // Index: 89
    2.5, -1, 4, 1, 1, 0,    // Index: 90
    1.2, -0.6, 4, 1, 1, 0,    // Index: 91
    2.5, -0.6, 4, 1, 1, 0,    // Index: 92
    1.7, -0.6, 4, 1, 1, 0,    // Index: 93
    1.7, 0.6, 4, 1, 1, 0,    // Index: 94
    1.2, 0.6, 4, 1, 1, 0,    // Index: 95
    2, -0.6, 4, 1, 1, 0,    // Index: 96
    2, 0.6, 4, 1, 1, 0,    // Index: 97
    2.5, 0.6, 4, 1, 1, 0,    // Index: 98
    1.7, -0.2, 4, 1, 1, 0,    // Index: 99
    2, -0.2, 4, 1, 1, 0,    // Index: 100
    1.7, 0.2, 4, 1, 1, 0,    // Index: 101
    2, 0.2, 4, 1, 1, 0,    // Index: 102
    1.2, 1, 4, 1, 1, 0,    // Index: 103
    2.5, 1, 4, 1, 1, 0,    // Index: 104

    // back
    1.2, -1, 3.5, 0, 1, 1,    // Index: 105
    2.5, -1, 3.5, 0, 1, 1,    // Index: 106
    1.2, -0.6, 3.5, 0, 1, 1,    // Index: 107
    2.5, -0.6, 3.5, 0, 1, 1,    // Index: 108
    1.7, -0.6, 3.5, 0, 1, 1,    // Index: 109
    1.7, 0.6, 3.5, 0, 1, 1,    // Index: 110
    1.2, 0.6, 3.5, 0, 1, 1,    // Index: 111
    2, -0.6, 3.5, 0, 1, 1,    // Index: 112
    2, 0.6, 3.5, 0, 1, 1,    // Index: 113
    2.5, 0.6, 3.5, 0, 1, 1,    // Index: 114
    1.7, -0.2, 3.5, 0, 1, 1,    // Index: 115
    2, -0.2, 3.5, 0, 1, 1,    // Index: 116
    1.7, 0.2, 3.5, 0, 1, 1,    // Index: 117
    2, 0.2, 3.5, 0, 1, 1,    // Index: 118
    1.2, 1, 3.5, 0, 1, 1,    // Index: 119
    2.5, 1, 3.5, 0, 1, 1,    // Index: 120

    /* === Kubus === */
    // Face A       // Red      // Surface orientation
    -1, 1, 1,      1, 1, 1, // Index:  121    
    1, 1, 1,       1, 1, 1,  // Index:  122
    -1, -1, 1,     1, 1, 1,    // Index:  123
    1, -1, 1,      1, 1, 1,    // Index:  124

    -1, 1, -1,      1, 0, 1, // Index:  125    
    1, 1, -1,       1, 0, 1,  // Index:  126
    -1, -1, -1,     1, 0, 1,    // Index:  127
    1, -1, -1,      1, 0, 1,    // Index:  128
];

function main() {
    kanvas = document.getElementById("my-canvas");
    gl = kanvas.getContext("webgl");

    // Vertex shader
    var vertexShaderCode = `
    attribute vec3 aPosition;   // Sebelumnya vec2, makanya tidak tergambar kubus :D
    attribute vec3 aColor;
    uniform mat4 uModel;
    uniform mat4 uView;
    uniform mat4 uProjection;
    varying vec3 vColor;
    void main() {
        gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
        vColor = aColor;
    }
    `;
    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);   // sampai sini sudah jadi .o

    // Fragment shader
    var fragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
    uniform vec3 uAmbientConstant;
    uniform float uAmbientIntensity;
    void main() {
        vec3 ambient = uAmbientConstant * uAmbientIntensity;
        vec3 phong = ambient;
        gl_FragColor = vec4(phong * vColor, 1.0);
    }
    `;
    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);   // sampai sini sudah jadi .o

    shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Model
    uModel = gl.getUniformLocation(shaderProgram, "uModel");

    // View
    var cameraX = 0.0;
    var cameraZ = 7.5;
    uView = gl.getUniformLocation(shaderProgram, "uView");
    view = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(
        view,
        [cameraX, 0.0, cameraZ],
        [cameraX, 0.0, -10],
        [0.0, 1.0, 0.0]
    );

    // Projection
    uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    perspective = glMatrix.mat4.create();
    glMatrix.mat4.perspective(perspective, glMatrix.glMatrix.toRadian(75), 1.0, 0.5, 50.0);

    var uAmbientConstant = gl.getUniformLocation(shaderProgram, "uAmbientConstant");
    var uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
    gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);
    gl.uniform1f(uAmbientIntensity, 0.758);

    function onKeydown(event) {
        if (event.keyCode == 37) thetaYSpeed = -0.05;
        if (event.keyCode == 39) thetaYSpeed = 0.05;
        if (event.keyCode == 38) thetaXSpeed = -0.05;
        if (event.keyCode == 40) thetaXSpeed = 0.05;
        if (event.keyCode == 73) cubeZSpeed = -0.0258;
        if (event.keyCode == 75) cubeZSpeed = 0.0258;
        if (event.keyCode == 74) cubeHorizontalSpeed = -0.0258;
        if (event.keyCode == 76) cubeHorizontalSpeed = 0.0258;
    }
    function onKeyup(event) {
        if (event.keyCode == 37 || event.keyCode == 39) thetaYSpeed = 0.0;
        if (event.keyCode == 38 || event.keyCode == 40) thetaXSpeed = 0.0;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    function render() {
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // drawR();
        drawY();
        draw5();
        // draw8();
        drawCube();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function drawR() {
    var indices = [
        // front
        0, 1, 2, 0, 2, 3,
        2, 4, 6, 2, 5, 6,
        4, 7, 8, 4, 8, 9,

        // left
        0, 1, 11, 0, 10, 11,
        7, 8, 13, 8, 12, 13,

        // top
        1, 5, 14, 1, 11, 14,

        // right
        5, 14, 15, 5, 6, 15,
        4, 16, 17, 4, 9, 17,
        3, 7, 18, 3, 18, 19,

        // bottom
        0, 3, 19, 0, 10, 19,
        8, 9, 17, 8, 12, 17,
        4, 15, 16, 4, 6, 15,

        // back
        20, 21, 22, 20, 22, 23,
        22, 24, 26, 22, 25, 26,
        24, 27, 28, 24, 28, 29,

    ];

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    thetaY += thetaYSpeed;
    model = glMatrix.mat4.create();
    glMatrix.mat4.rotateY(
        model, model, thetaY
    );
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawY() {
    var indices = [
        // front
        30, 32, 33, 30, 31, 33,
        32, 33, 38,
        32, 35, 38, 32, 34, 35,
        33, 36, 38, 33, 36, 37,

        // left
        30, 32, 40, 30, 39, 40,
        32, 34, 41, 32, 40, 41,

        // top
        34, 35, 42, 34, 41, 42,
        35, 38, 43, 35, 42, 43,
        36, 38, 43, 36, 43, 44,
        36, 37, 44, 37, 44, 45,

        // right
        33, 37, 45, 33, 45, 46,
        31, 33, 46, 31, 46, 47,

        // bottom
        30, 31, 47, 30, 39, 47,

        // back
        48, 50, 51, 48, 49, 51,
        50, 51, 56,
        50, 53, 56, 50, 52, 53,
        51, 54, 56, 51, 54, 55,
    ];

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    thetaX += thetaXSpeed;
    model = glMatrix.mat4.create();
    glMatrix.mat4.rotateX(
        model, model, thetaX
    );
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function draw5() {
    var indices = [
        // front
        57, 58, 60, 57, 59, 60,
        58, 61, 62, 58, 62, 63,
        63, 64, 65, 63, 65, 66,
        66, 68, 69, 66, 67, 69,
        69, 71, 72, 69, 70, 72,

        // back
        73, 74, 76, 73, 75, 76,
        74, 77, 78, 74, 78, 79,
        79, 80, 81, 79, 81, 82,
        82, 84, 85, 82, 83, 85,
        85, 87, 88, 85, 86, 88,

        // left
        57, 73, 75, 57, 59, 75,
        60, 76, 80, 60, 64, 80,
        65, 81, 84, 65, 68, 84,

        // top
        68, 84, 87, 68, 71, 87,
        62, 78, 83, 62, 67, 83,

        // right
        61, 77, 78, 61, 62, 78,
        71, 87, 88, 71, 72, 88,
        67, 83, 86, 67, 70, 86,

        // bottom
        57, 73, 77, 57, 61, 77,
        64, 80, 81, 64, 65, 81,
    ];

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    horizontalDelta += horizontalSpeed;
    if (horizontalDelta > 1.6 || horizontalDelta < -2.8) {
        horizontalSpeed *= -1;
    }
    model = glMatrix.mat4.create();
    glMatrix.mat4.translate(
        model, model, [horizontalDelta, 0.0, 0.0]
    );
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function draw8() {
    var indices = [
        // front
        89, 90, 92, 89, 91, 92,
        91, 94, 95, 91, 93, 94,
        92, 97, 98, 92, 96, 97,
        95, 103, 104, 95, 98, 104,
        99, 101, 102, 99, 100, 102,

        // back
        105, 106, 108, 105, 107, 108,
        107, 110, 111, 107, 109, 110,
        108, 113, 114, 108, 112, 113,
        111, 119, 120, 111, 114, 120,
        115, 117, 118, 115, 116, 118,

        // left
        89, 105, 119, 89, 103, 119,
        97, 113, 112, 97, 96, 112,

        // top
        103, 119, 120, 103, 104, 120,
        101, 117, 118, 101, 102, 118,
        93, 109, 112, 93, 96, 112,

        // right
        104, 120, 106, 104, 90, 106,
        93, 109, 110, 93, 94, 110,

        // bottom
        89, 105, 106, 89, 90, 106,
        99, 115, 116, 99, 100, 116,
        94, 110, 113, 94, 97, 113,
    ];

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    scale += scaleSpeed;
    if (scale > 2 || scale < 0.5) {
        scaleSpeed *= -1;
    }

    model = glMatrix.mat4.create();
    glMatrix.mat4.scale(
        model, model, [scale, scale, scale]
    );
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawCube() {
    var indices = [
        // front
        121, 122, 123,  122, 123, 124,
        
        // back
        125, 126, 127,  126, 127, 128,

        // left
        121, 125, 123,  125, 127, 123,

        // right
        122, 126, 124,  124, 126, 128,

        // top
        121, 122, 125,  122, 125, 126,
        // bottom
        123, 124, 127,  124, 127, 128
    ];

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(aPosition);

    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    cubeHorizontalDelta += cubeHorizontalSpeed;
    cubeZDelta += cubeZSpeed
    model = glMatrix.mat4.create();
    glMatrix.mat4.translate(
        model, model, [cubeHorizontalDelta, 0.0, cubeZDelta]
    );
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}