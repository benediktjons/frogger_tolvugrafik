window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0.5, 1, 0.8 );

    gl.enable(gl.DEPTH_TEST);
 
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // VBO for the ground
    groundBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(groundVertices), gl.STATIC_DRAW );

    // Create the frog
    frog = new frog();

    //Buffer for the frog
    cubeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cubeVertices), gl.STATIC_DRAW);


    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "fColor" );

    mvLoc = gl.getUniformLocation( program, "modelview" );

    // set projection
    pLoc = gl.getUniformLocation( program, "projection" );
    proj = perspective( 50.0, 1.0, 1.0, 500.0 );
    gl.uniformMatrix4fv(pLoc, false, flatten(proj));

    //Start a new game
    resetGame();

    //Add event listener for A,S,W,D, arrow buttons and spacebar
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 37:// left arrow
            case 65:// a
                frog.frogYPos-=frog.frogSize;
                frog.frogAngle = 180;
                frog.isRiding=false;
                break;
            case 40:// back arrow
            case 83:// s
                if (frog.frogXPos<90){
                    frog.frogXPos+=2*frog.frogSize;
                    frog.frogAngle = 270;
                    frog.isRiding=false;
                }
                break;
            case 38: // up arrow
            case 87: // w
                if (frog.frogXPos>-70){
                    frog.frogXPos-=2*frog.frogSize;
                    frog.frogAngle = 90;
                    frog.isRiding=false;
                }
                break;
            case 39: // right arrow
            case 68: // d
                frog.frogYPos+=frog.frogSize;
                frog.frogAngle = 0;
                frog.isRiding=false;
                break;
            case 32: // spacebar
                if (viewpoint==0){
                    viewpoint=1;
                }
                else{
                    viewpoint=0;
                }

                break
            case(88):// x-takkinn til ad mute-a
               if(boolSound === true){
                    document.getElementById("REQ").muted = true;
                    document.getElementById("boom").muted = true;
                    document.getElementById("splash").muted = true;
                    document.getElementById("myBtn2").style.color = "orange";
                    boolSound = false;

                  }
            else{
                document.getElementById("REQ").muted = false;
                document.getElementById("boom").muted = false;
                document.getElementById("splash").muted = false;
                document.getElementById("myBtn2").style.color = "white";
                boolSound = true;
            }

                break;

        }
    });
document.getElementById("myBtn").addEventListener("click", backMusic);
document.getElementById("myBtn2").addEventListener("click", allMusic);
function backMusic() {
      if(boolBackSound === true){
                    document.getElementById('REQ').muted = true;
                    boolBackSound = false;
                    document.getElementById("myBtn").innerHTML = "Sound";
                }
                 else{
                    document.getElementById('REQ').muted = false;
                    boolBackSound = true;
                    document.getElementById("myBtn").innerHTML = "Mute";
                }
}

function allMusic(){
    if(boolSound === true){
        document.getElementById("REQ").muted = true;
        document.getElementById("boom").muted = true;
        document.getElementById("splash").muted = true;
        document.getElementById("myBtn2").style.color = "orange";
        boolSound = false;

    }
    else{
        document.getElementById("REQ").muted = false;
        document.getElementById("boom").muted = false;
        document.getElementById("splash").muted = false;
        document.getElementById("myBtn2").style.color = "white";
        boolSound = true;
    }
}

    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (viewpoint==0){
        var mv = lookAt( vec3(200,0, 200 ), vec3(0,0,0 ), vec3(0.0, 0.0, 1.0) );
    }
    else if (viewpoint==1){
        var mv = lookAt( vec3(frog.frogXPos+80,frog.frogYPos, 50 ), vec3(frog.frogXPos-60,frog.frogYPos,5.0 ), vec3(0.0, 0.0, 1.0) );
    }

    // Render the cars and update their positions
    for(var j = 0; j<cars.length; j++){
        cars[j].render(mv);
        cars[j].update();
    }

    //Draw the scenery
    drawScenery(mv);

    //Render the logs and update their positions
    for(j = 0; j<logs.length; j++){
        logs[j].render(mv);
        logs[j].update();
        //console.log(logs[j]);
    }

    //Render and update the frog
    frog.update();
    frog.render(mv);

    //Check if the frog has won
    frog.win();

    requestAnimFrame( render );
}

