function checkWebGL(canvas) {
    var contexts = ["webgl", "expreimental-webgl", "webkit-3d", "moz-webggl"], gl;
    for (var i = 0; i<contexts.length; i++){
        try{
            gl = canvas.getContext(contexts[i]);
        } catch(e) {}
        if (gl) {
            break;
        }
    }
    if (!gl){
        alert("WebGL not available, sorry! Please use a new version of Chrome or Firefox.");
    }
    return gl;
}

function main() {
    var canvas = document.getElementById("my-canvas");
    var gl = checkWebGL(canvas);

    var rVertices = [
        -0.9, 0.75,      // 1
        -0.9, -0.75,     // 2
        -0.7, -0.75,     // 3
        -0.7, -0.25,     // 4
        -0.65, -0.75,       // 5
        -0.45, -0.75,     // 6
        -0.55, -0.1,     // 7
        -0.4, 0.325,
        -0.55, 0.75
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rVertices), gl.STATIC_DRAW);

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
    var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition)

    gl.clearColor(0.4, 0.7, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 9);
    gl.drawArrays(gl.LINE_LOOP, 0, 9);

}