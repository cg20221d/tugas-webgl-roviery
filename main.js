var gl, kanvas, shaderProgram;
var uModel, uView, uProjection, view, proj, model;
var thetaYSpeed = 0.0;
var thetaY = 0.0;
var thetaXSpeed = 0.0;
var thetaX = 0.0;

var vertices = [
    /* === R === */
    // front
    -2.2, -1,  4,       1, 1, 0,      // Index: 0
    -2.2,  1,  4,       1, 1, 0,      // Index: 1
    -1.8,  1,  4,       1, 1, 0,      // Index: 2
    -1.8, -1,  4,       1, 1, 0,      // Index: 3
    -1.8,  0,  4,       1, 1, 0,      // Index: 4
    -1.4,  1,  4,       1, 1, 0,      // Index: 5
    -1.4,  0,  4,       1, 1, 0,      // Index: 6
    -1.8, -0.6,4,       1, 1, 0,      // Index: 7
    -1.6, -1,  4,       1, 1, 0,      // Index: 8
    -1.2, -1,  4,       1, 1, 0,      // Index: 9

    // left
    -2.2, -1, 3.5,      0, 1, 1,      // Index: 10 
    -2.2,  1, 3.5,      0, 1, 1,      // Index: 11
    -1.6, -1, 3.5,      0, 1, 1,      // Index: 12
    -1.8, -0.6, 3.5,    0, 1, 1,      // Index: 13

    // top
    -1.4,  1, 3.5,      0, 1, 1,      // Index: 14

    // right
    -1.4,  0, 3.5,      0, 1, 1,      // Index: 15
    -1.8,  0, 3.5,      0, 1, 1,      // Index: 16
    -1.2, -1, 3.5,      0, 1, 1,      // Index: 17
    -1.8, -0.6, 3.5,    0, 1, 1,      // Index: 18
    -1.8, -1, 3.5,      0, 1, 1,      // Index: 19

    // back
    -2.2, -1,  3.5,       0, 1, 1,    // Index: 20
    -2.2,  1,  3.5,       0, 1, 1,    // Index: 21
    -1.8,  1,  3.5,       0, 1, 1,    // Index: 22
    -1.8, -1,  3.5,       0, 1, 1,    // Index: 23
    -1.8,  0,  3.5,       0, 1, 1,    // Index: 24
    -1.4,  1,  3.5,       0, 1, 1,    // Index: 25
    -1.4,  0,  3.5,       0, 1, 1,    // Index: 26
    -1.8, -0.6,3.5,       0, 1, 1,    // Index: 27
    -1.6, -1,  3.5,       0, 1, 1,    // Index: 28
    -1.2, -1,  3.5,       0, 1, 1,    // Index: 29

    /* ===Y=== */
    // front
    -0.7, -1, 4,          1, 1, 0,    // Index: 30
    -0.2, -1, 4,          1, 1, 0,    // Index: 31
    -0.7, 0, 4,           1, 1, 0,    // Index: 32
    -0.2, 0, 4,           1, 1, 0,    // Index: 33
    -1.2, 0.7, 4,         1, 1, 0,    // Index: 34
    -0.85, 1, 4,          1, 1, 0,    // Index: 35
    -0.05, 1, 4,          1, 1, 0,    // Index: 36
    0.3, 0.7, 4,          1, 1, 0,    // Index: 37
    -0.45, 0.4, 4,        1, 1, 0,    // Index: 38

    // left
    -0.7, -1, 3.5,        0, 1, 1,    // Index: 39
    -0.7, 0, 3.5,         0, 1, 1,    // Index: 40

    // top
    -1.2, 0.7, 3.5,       0, 1, 1,    // Index: 41
    -0.85, 1, 3.5,        0, 1, 1,    // Index: 42
    -0.45, 0.4, 3.5,      0, 1, 1,    // Index: 43
    -0.05, 1, 3.5,        0, 1, 1,    // Index: 44
    0.3, 0.7, 3.5,        0, 1, 1,    // Index: 45

    // right
    -0.2, 0, 3.5,         0, 1, 1,    // Index: 46
    -0.2, -1, 3.5,        0, 1, 1,    // Index: 47

    // back
    -0.7, -1, 3.5,        0, 1, 1,    // Index: 48
    -0.2, -1, 3.5,        0, 1, 1,    // Index: 49
    -0.7, 0, 3.5,         0, 1, 1,    // Index: 50
    -0.2, 0, 3.5,         0, 1, 1,    // Index: 51
    -1.2, 0.7, 3.5,       0, 1, 1,    // Index: 52
    -0.85, 1, 3.5,        0, 1, 1,    // Index: 53
    -0.05, 1, 3.5,        0, 1, 1,    // Index: 54
    0.3, 0.7, 3.5,        0, 1, 1,    // Index: 55
    -0.45, 0.4, 3.5,      0, 1, 1,    // Index: 56
];

function main() {
    kanvas = document.getElementById("my-canvas");
    gl = kanvas.getContext("webgl");

    // Vertex shader
    var vertexShaderCode =  `
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
    void main() {
        gl_FragColor = vec4(vColor, 1.0);
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

    function onKeydown(event) {
        if (event.keyCode == 37) thetaYSpeed = -0.05;
        if (event.keyCode == 39) thetaYSpeed = 0.05;
        if (event.keyCode == 38) thetaXSpeed = -0.05;
        if (event.keyCode == 40) thetaXSpeed = 0.05;
    }
    function onKeyup(event) {
        if (event.keyCode == 37 || event.keyCode == 39) thetaYSpeed = 0.0;
        if (event.keyCode == 38 || event.keyCode == 40) thetaXSpeed = 0.0;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    function render() {
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        drawR();
        drawY();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

function drawR(){
    var indices = [
        // front
        0, 1, 2,    0, 2, 3,
        2, 4, 6,    2, 5, 6,
        4, 7, 8,    4, 8, 9,
        
        // left
        0, 1, 11,   0, 10, 11,
        7, 8, 13,   8, 12, 13,

        // top
        1, 5, 14,   1, 11, 14,

        // right
        5, 14, 15,  5, 6, 15,
        4, 16, 17,  4, 9, 17,
        3, 7, 18,   3, 18, 19,  

        // bottom
        0, 3, 19,   0, 10, 19,
        8, 9, 17,   8, 12, 17,
        4, 15, 16,  4, 6, 15,

        // back
        20, 21, 22,    20, 22, 23,
        22, 24, 26,    22, 25, 26,
        24, 27, 28,    24, 28, 29,

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

function drawY(){
    var indices = [
        // front
        30, 32, 33,     30, 31, 33,
        32, 33, 38,
        32, 35, 38,     32, 34, 35,
        33, 36, 38,     33, 36, 37,

        // left
        30, 32, 40,     30, 39, 40,
        32, 34, 41,     32, 40, 41,  

        // top
        34, 35, 42,     34, 41, 42,
        35, 38, 43,     35, 42, 43,
        36, 38, 43,     36, 43, 44,
        36, 37, 44,     37, 44, 45,

        // right
        33, 37, 45,     33, 45, 46,
        31, 33, 46,     31, 46, 47,

        // bottom
        30, 31, 47,     30, 39, 47,

        // back
        48, 50, 51,     48, 49, 51,
        50, 51, 56,
        50, 53, 56,     50, 52, 53,
        51, 54, 56,     51, 54, 55,
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