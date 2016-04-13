function log(xPos, yPos, Speed, length){
    this.logXPos = xPos;
    this.logYPos = yPos;
    this.logSpeed = Speed*difficulty;
    this.logColor = BROWN;
    this.logLength = length;
    this.logWidth = 8;
    this.logHeight = 1;
    this.isATurtle=false;
    this.turtleIsUnderwater=false;
    this.diveRange=200*Math.random()-100;
}

log.prototype.update = function(){
    var divTurtles;
    if (difficulty==0.3) divTurtles=10
    if (difficulty==0.6) divTurtles=5
    if (difficulty==1) divTurtles=2
    if((this.logId % divTurtles) == 0) this.isATurtle=true;
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
    if (!this.turtleIsUnderwater){
        frog.logCollisionCheck(this);
    }
};

log.prototype.render = function(mv){
    if (this.isATurtle && this.turtleIsUnderwater) return;
    gl.uniform4fv(colorLoc, this.logColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    mv = mult(mv, translate(this.logXPos, this.logYPos, 1.5));
    mv = mult(mv, scalem(this.logWidth, this.logLength, this.logHeight));

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, 36);
};