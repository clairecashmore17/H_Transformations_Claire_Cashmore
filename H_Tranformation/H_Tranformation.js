"use strict";
var canvas;
var gl;

// Set the theta that will be altered to rotate letter



var fColorLocation;
var matrixLocation;
var matrix;
// delay (or n) is the number of frames we load at
var delay = 10;

//cindex is how we will change the colors
var cindex = 1.0;

var fps = 5;

// r b g values (a will always be 1)
var r, b, g;
//Run this once the page has loaded
window.onload = function init() {

    //Draw canvas
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //Configure Viewport and clear color
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //Vertices needed to make H
    var h1_vertices = [
        vec2(-.25, .25 ),
        vec2(-.25, -.25 ),
        vec2(-.25, 0 ),
        vec2(.25, 0 ),
        vec2(.25, .25 ),
        vec2(.25, 0),
        vec2(.25, -.25)
    ];
   // console.log(h1_vertices[0][0]);
    //Vertices needed to make H2
    var h2_vertices = [
        vec2(-.25, .25 ),
        vec2(-.25, -.25 ),
        vec2(-.25, 0 ),
        vec2(.25, 0 ),
        vec2(.25, .25 ),
        vec2(.25, 0),
        vec2(.25, -.25)
    ];


    
  // Set aside uniform to store the matrix
    matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    //Create identity matrix
    matrix = mat4();
    // translate the matrix to upper right
    matrix = translate(.5,0.5,0);
    // use mult to then rotate after the translation
    matrix = mult( matrix,rotate(-45,0,0,1));
   
    // console.log(matrix);
 
    // Create a buffer object, initialize it, and associate it with the
    //load into the GPU
    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(h1_vertices), gl.STATIC_DRAW);
   

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
   


    // Create second buffer for 2nd H
    var bufferID2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(h2_vertices), gl.STATIC_DRAW);
   

    //Associate our shade vars again, but for 2nd H?...
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(vPosition);
    


    // identify location for uniform value fColor
    // Using uniform because the entire shape (all points) will be the same color
    fColorLocation = gl.getUniformLocation(program, "fColor");

  



   render();
  
}


function render() {
    //increase theta to rotate shape
    r = 1.0;
    b = 0.0;
    g = 0.0;
    
        gl.clear(gl.COLOR_BUFFER_BIT);
        

        
        // send uniform value to vertex shader
        // console.log(theta);
     
        //send uniform value to fragment shader
        gl.uniform4f(fColorLocation, r, b, g, 1.0);
        // Set the matrix uniform in the shader
        gl.uniformMatrix4fv(matrixLocation, false, flatten(matrix));
        //draw the two H's
      
        gl.drawArrays(gl.LINE_STRIP, 0,7);
       
        gl.drawArrays(gl.LINE_STRIP, 0,7);
        

    
    requestAnimationFrame(render);
    


}