function frog(angle){

    this.frogXPos = 70;
    this.frogYPos = 0;
    this.frogSize = 5.0;
    this.frogAngle = angle || 90;
    this.frogDirectionX = Math.cos(radians(this.frogAngle)); // til þess hann fari ekki i x at þegar hann a ad fara i y att
    this.frogDirectionY = Math.sin(radians(this.frogAngle)); // -||-
    this.frogWidth = this.frogSize;
    this.frogLength = this.frogSize;
    this.isRiding=false;
}


frog.prototype.update = function(angle){
    frog.inWaterCheck();
};

frog.prototype.render = function(mv){
    mv = mult(mv, translate(this.frogXPos, this.frogYPos, this.frogWidth));
    mv = mult(mv, rotateZ(-this.frogAngle));
    mv = mult(mv, scalem(this.frogSize, this.frogSize +3, this.frogSize));

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.uniform4fv(colorLoc, GREEN);

    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays(gl.TRIANGLES, 0, 36);

};

frog.prototype.carCollisionCheck = function(c){
    fx1=this.frogXPos-this.frogLength/2;
    fx2=this.frogXPos+this.frogLength/2;
    fy1=this.frogYPos-this.frogWidth/2;
    fy2=this.frogYPos+this.frogWidth/2;

    cx1=c.carXPos-c.carWidth/2
    cx2=c.carXPos+c.carWidth/2
    cy1=c.carYPos-c.carLength/2
    cy2=c.carYPos+c.carLength/2
    if ( fx1<=cx2 && fy1<=cy2 && fx1>=cx1 && fy1>=cy1 ||
        fx2<=cx2 && fy2<=cy2 && fx2>=cx1 && fy2>=cy1 ||
         fx1<=cx2 && fy2<=cy2 && fx1>=cx1 && fy2>=cy1 ||
         fx2<=cx2 && fy1<=cy2 && fx2>=cx1 && fy1>=cy1){
        document.getElementById('boom').play();
        resetGame();
    }
};
frog.prototype.logCollisionCheck = function(l){
    fx1=this.frogXPos;
    fy1=this.frogYPos;
    lx1=l.logXPos-l.logWidth/2;
    lx2=l.logXPos+l.logWidth/2;
    ly1=l.logYPos-l.logLength/2;
    ly2=l.logYPos+l.logLength/2;
    if ( fx1<=lx2 && fy1<=ly2 && fx1>=lx1 && fy1>=ly1){
        frog.isRiding=true;
        frog.frogYPos+=l.logSpeed;
        if (l.turtleIsUnderwater){
            resetGame();
        }
    }
    if (this.frogYPos<=-95 || this.frogYPos>=100){
        frogFuneral=true;
        resetGame();
    }
};

frog.prototype.inWaterCheck= function(){
    if (this.frogXPos<=-20 && this.frogXPos>=-50){
        if (!frog.isRiding){
            document.getElementById('splash').play();
            resetGame();
        }
    }
};

frog.prototype.win = function(){
    if(this.frogXPos <= -60){
        console.log("WINNING");
        document.getElementById('vic').play();
        var bool = confirm("WINNING, wanna play again?");
        if(bool === true){
            resetGame();
        }
        else{
            location.assign("http://www.visir.is/forsida");
        }
    }
};


