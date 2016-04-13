function resetGame(){
    cars = [];

    logs = [];

    //-------------------------------------------------------------------------------------------------
    //Create the cars
    //----------------------------------------------------------------------------------------------
    
    var numCars = 20;
    for (var i = 0; i<numCars; i++){
        if(i > 15){
            cars.push(new car(RED, 50*(i-16) - 100, 57, 1));
        }
        else if(i > 10 && i<15){
            cars.push(new car(YELLOW, 20*i - 200,  47, 2));
        }
        else if(i > 4 && i<8){
            cars.push(new car(MAGNETA, 40*i - 200, 37, -3));
        }
        else{
            cars.push(new car(CYAN, i*30 - 30 , 27, -0.5));
        }
    }
    //-----------------------------------------------------------------------------------------------------------------------
    // Create the logs
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
        console.log(logs[i].diveRange);
        logs[i].logId=i;
    }
    //-------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------

    frog.frogYPos=0;
    frog.frogXPos=70;
}