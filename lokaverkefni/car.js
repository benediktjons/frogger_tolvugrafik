function car(color, yPos, xPos, speed){

    this.carXPos = xPos;
    this.carYPos = yPos;
    this.carWidth = 8.0;
    this.carLength = 15.0 ;
    this.carHeight = 5.0 ;
    this.carColor = color ;
    this.carSpeed = speed;
    this.ShiftX = - 0.2;
    this.ShiftY = - 1;
    this.ShiftZ = 7;
}

car.prototype.update = function(){
    if(this.carSpeed < 0){
        this.ShiftY= 1;
    }

    // Check if car has left the world, if so reset its position
    if(this.carYPos > 150){
        this.carYPos = -120 ;
    }

    else if(this.carYPos < -150){
        this.carYPos = 120;
    }

    else{
        this.carYPos += this.carSpeed;
    }

    frog.carCollisionCheck(this);
};

car.prototype.render = function(mv){
    gl.uniform4fv(colorLoc, this.carColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    var mv1 = mv;
    //---------------------------------------------------------------------------------------------------------------------
    // lower body of the car
    //---------------------------------------------------------------------------------------------------------------------
    mv = mult(mv, translate(this.carXPos, this.carYPos, 3));
    mv = mult(mv, scalem(this.carWidth, this.carLength, this.carHeight));

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, 36);
    //------------------------------------------------------------------------------------------------------------------------
    // upper part of the car
    //------------------------------------------------------------------------------------------------------------------------
    mv1 = mult(mv1, translate(this.ShiftX + this.carXPos, this.ShiftY + this.carYPos, this.ShiftZ));
    mv1 = mult(mv1, scalem(this.carWidth, this.carLength-9, this.carHeight -1));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv1));
    gl.drawArrays(gl.TRIANGLES, 0, 36);

};
