window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0.5, 1, 0.5 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // VBO for the ground
    groundBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(groundVertices), gl.STATIC_DRAW );

    frog = new frog();
 // utbum bilana
    //colors = [BLUE, RED, YELLOW, CYAN, MAGNETA, GREEN];
    var carColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    ];
    //-------------------------------------------------------------------------------------------------
    //utbum bilana, svo lika i render og objectinu cars
    //----------------------------------------------------------------------------------------------
    var numCars = 20; // maeti breyta yfir i global seinna
    colors = [BLUE, RED, CYAN, YELLOW, MAGNETA, BLACK];
/*
    for (var i = 0; i<numCars/4; i++){
        color = vec4(Math.random(), Math.random(), Math.random(), 1);
        whatColor = Math.round((Math.random()*(colors.length-1)));
        cars.push(new car(colors[whatColor], 20*i - 90, 40, 1));

    }
*/

for (var i = 0; i<numCars; i++){
        color = vec4(Math.random(), Math.random(), Math.random(), 1);
        whatColor = Math.round((Math.random()*(colors.length-1)));
        if(i > 15){
            cars.push(new car(colors[2], 50*(i-16) - 100, 57, 1));
        }
        else if(i > 10 && i<15){
            cars.push(new car(colors[4], 20*i - 200,  47, 2));
        }
        else if(i > 4 && i<8){
            cars.push(new car(colors[3], 40*i - 200, 37, -3));
            //cars.push(new car(colors[whatColor], 20*i - 100, 0, 2));
        }
        else{
            cars.push(new car(colors[1], i*30 - 30 , 27, -0.5));
        }
}
//-----------------------------------------------------------------------------------------------------------------------
// buum til trjabutana
//------------------------------------------------------------------------------------------------------------------------

var logsOnLane=5;
var numLogs = logsOnLane*4;
for(i = 0; i<numLogs; i++){
    if(i<logsOnLane){
        logs.push(new log(-52, -30*i, 0.4, 14));
    }
    else if(i>=logsOnLane && i<logsOnLane*2){
        logs.push(new log(-42, 20*(i-logsOnLane), -0.5, 15));
    }
     else if(i>=logsOnLane*2 && i<logsOnLane*3){
        logs.push(new log(-32, 30*(i-logsOnLane*2), 0.8, 12));
    }
     else if(i>=logsOnLane*3 && i<logsOnLane*4){
        logs.push(new log(-22, 30*(i-logsOnLane*3), -1, 20));
    }
    logs[i].logId=i;
}
//-------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

    //Buffer fyrir froskinn
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

      window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {

            case (65 || 37): // a eða left arrow
                frog.frogYPos-=frog.frogSize;
                frog.frogAngle = 180;
                frog.isRiding=false;
                break;
            case (83 || 40): // s eða back arrow
                if (frog.frogXPos<90){
                    frog.frogXPos+=2*frog.frogSize;
                    frog.frogAngle = 270;
                    frog.isRiding=false;
                }
                break;
            case (87 || 38 ) : // w eða upp arrow
                if (frog.frogXPos>-70){
                    frog.frogXPos-=2*frog.frogSize;
                    frog.frogAngle = 90;
                    frog.isRiding=false;
                }
                break;
            case (68 || 39): // d eða right arrow
                frog.frogYPos+=frog.frogSize;
                frog.frogAngle = 0;
                frog.isRiding=false;
                break;
            case (32): // bilstöng
                if (viewpoint==0){
                    viewpoint=1;
                }
                else{
                    viewpoint=0;
                }
                break;

        }});

    render();
};


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();

    if (viewpoint==0){
        mv = lookAt( vec3(200,0, 200 ), vec3(0,0,0 ), vec3(0.0, 0.0, 1.0) );
    }
    else if (viewpoint==1){
        mv = lookAt( vec3(frog.frogXPos+60,frog.frogYPos, 40 ), vec3(frog.frogXPos-60,frog.frogYPos,5.0 ), vec3(0.0, 0.0, 1.0) );
    }

    //-------------------------------------------------------------------------------------------------------------------------
    // renduerum bilana þannig .þeir birtist stoðugt upp a nytt og eru stoðugt a hreyfingu
    //--------------------------------------------------------------------------------------------------------------------------
    for(var j = 0; j<cars.length; j++){
        cars[j].render(mv);
        cars[j].update();
    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    // teiknum grunninn
    //-----------------------------------------------------------------------------------------------------------------------------------
    drawStreet(mv,20,500);
    drawRiver(mv,20,500);
    drawGround(mv,500);
    drawBox(mv,200,5,1,1);
    drawBox(mv,200,5,-1,1);
    drawBox(mv,200,5,1,0);
    drawBox(mv,200,5,-1,0);

    //-------------------------------------------------------------------------------------------------------------------------------------
    // teiknum the logs
    //------------------------------------------------------------------------------------------------------------------------------------
    //console.log(logs);
    for(j = 0; j<logs.length; j++){
        logs[j].render(mv);
        logs[j].update();
        //console.log(logs[j]);
    }
    frog.update();
    frog.render(mv);
       frog.win();

    requestAnimFrame( render );
}

