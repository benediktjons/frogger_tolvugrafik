function log(xPos, yPos, Speed, length){

    this.logXPos = xPos;
    this.logYPos = yPos;
    this.logSpeed = Speed;
    this.logColor = BROWN;
    this.logLength = length;
    this.logWidth = 8;
    this.logHeight = 1;
    this.isATurtle=false;
    this.turtleIsUnderwater=false;
    this.diveRange=70*Math.random();
}

log.prototype.update = function(){
    if((this.logId % 2) == 0) this.isATurtle=true;
    if (this.isATurtle) {
        this.logColor=RED;
        if(this.logYPos<this.diveRange && this.logYPos>=-this.diveRange){
            this.turtleIsUnderwater=true;
            frog.logCollisionCheck(this);
        }
        else{
            this.turtleIsUnderwater=false;
        }
    }
    if(this.logYPos > 150){
        this.logYPos = -150;
    }
    else if(this.logYPos < -150){
        this.logYPos = 150;
    }
    else{
        this.logYPos += this.logSpeed;
    }
    if (!this.turtleIsUnderwater){ //Hér þarf að skipta true út fyrir checki á hvort turtle sé í kafi
        frog.logCollisionCheck(this);
    }
};



log.prototype.render = function(mv){
    if (this.isATurtle && this.turtleIsUnderwater) return;
    gl.uniform4fv(colorLoc, this.logColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    mv = mult(mv, translate(this.logXPos, this.logYPos, 2));
    mv = mult(mv, scalem(this.logWidth, this.logLength, this.logHeight));

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, 36);
};