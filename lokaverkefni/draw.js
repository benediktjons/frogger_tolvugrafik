function drawScenery(mv){
    drawStreet(mv,20,500);
    drawRiver(mv,20,500);
    drawGround(mv,500);
    drawBox(mv,200,5,1,1);
    drawBox(mv,200,5,-1,1);
    drawBox(mv,200,5,1,0);
    drawBox(mv,200,5,-1,0);
}

function drawGround( mv ,size) {

    gl.uniform4fv( colorLoc, DARKGREEN );
    
    if (viewpoint==0){
        mv = mult( mv, scalem( size/2, size, 0 ) );
    }
    if (viewpoint==1){
        mv = mult( mv, scalem( size/3, size, 0 ) );
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );
}

function drawStreet( mv ,width,size) {

    gl.uniform4fv( colorLoc, BLACK );
    
    mv = mult( mv, translate(40, 0, 0 ) );
    mv = mult( mv, scalem( width, size, -0.01) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );

}
function drawRiver( mv ,width,size) {

    gl.uniform4fv( colorLoc, BLUE );
    
    mv = mult( mv, translate(-40, 0, 0 ) );
    mv = mult( mv, scalem( width, size, -0.03) );

    gl.bindBuffer( gl.ARRAY_BUFFER, groundBuffer );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, numGroundVertices );    
}

function drawBox( mv ,size,width,i,top) {
    if (top==0){
        gl.uniform4fv( colorLoc, WHITE );
        
        mv = mult( mv, translate(0, 3+i*size/2, 0 ) );
        mv = mult( mv, scalem( size, width, -1) );

        gl.bindBuffer( gl.ARRAY_BUFFER, cubeBuffer );
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

        gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
        gl.drawArrays( gl.TRIANGLES, 0, numCubeVertices );    
    }
    else if (top==1){
        gl.uniform4fv( colorLoc, WHITE );
        
        mv = mult( mv, translate(i*size/2, 3, 0 ) );
        mv = mult( mv, scalem( width,size+5, -1) );

        gl.bindBuffer( gl.ARRAY_BUFFER, cubeBuffer );
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );

        gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
        gl.drawArrays( gl.TRIANGLES, 0, numCubeVertices );        
    }
}
