/**
 * Created by dufl on 4/28/2016.
 */
var Q=require('q');

var robotHelper ={};

var map={
    height:0,
    width:0
};

var currentPosition={
    x:0,
    y:0
}

var dirtMap={};

var cleanedDirt=0;

var directions='';

robotHelper.run=function(input){
    //init cleaned dirt number
    cleanedDirt=0;

    //validate input
    if(robotHelper.inputValidater(input)==false){
        return {invalidInput:true};
    }

    //parse input
    robotHelper.parseInput(input);

    //clean initial position
    if(dirtMap[currentPosition.x] && dirtMap[currentPosition.x][currentPosition.y]){
        cleanedDirt++;
        delete dirtMap[currentPosition.x][currentPosition.y];
    }

    //move robot
    for(var i=0;i<directions.length;i++){
        var direction=directions[i];
        robotHelper.move(direction);
    }
    return {
        cleanedDirt:cleanedDirt,
        finalPosition:currentPosition
    };
}

robotHelper.parseInput=function(input){
    //split lines
    var params=input.split('\r\n');

    //parse map coordinates
    var mapCoods=params[0].split(' ');
    map.width=Number(mapCoods[0]);
    map.height=Number(mapCoods[1]);

    //parse initial position
    var initCoods=params[1].split(' ');
    currentPosition.x=Number(initCoods[0]);
    currentPosition.y=Number(initCoods[1]);

    //parse dirt positions
    for(var i=2;i<(params.length-1);i++){
        var dirtCoods=params[i].split(' ');
        if(!dirtMap[Number(dirtCoods[0])]){
            dirtMap[Number(dirtCoods[0])]={};
        }
        dirtMap[Number(dirtCoods[0])][Number(dirtCoods[1])]=true;
    }

    //parse moving instruction
    directions=params[params.length-1];
}

robotHelper.inputValidater=function(input){
    var params=input.split('\r\n');

    //validate coordinates
    if(params.length<2) return false;
    for(var i=0;i<(params.length-2);i++){
        var mapcoods=params[i].split(' ');
        if(mapcoods.length!=2) return false;
        if(mapcoods[0]<0 || mapcoods[1]<0 || !__isInt(mapcoods[0]) || !__isInt(mapcoods[1])) return false;
    }

    //validate instructions
    var directions=params[params.length-1];
    if(directions.length<1) return false;
    for(var i=0;i<directions.length;i++){
        if(directions[i]!='N' && directions[i]!='W' && directions[i]!='E' && directions[i]!='S'){
            return false;
        }
    }
    return true;

}

robotHelper.move=function(direction){
    switch(direction) {
        case 'N':
            if(currentPosition.y==(map.height-1)){
                return;
            }
            else{
                currentPosition.y+=1;
                if(dirtMap[currentPosition.x] && dirtMap[currentPosition.x][currentPosition.y]){
                    cleanedDirt++;
                    delete dirtMap[currentPosition.x][currentPosition.y];
                }
            }
            break;
        case 'S':
            if(currentPosition.y==0){
                return;
            }
            else{
                currentPosition.y-=1;
                if(dirtMap[currentPosition.x] && dirtMap[currentPosition.x][currentPosition.y]){
                    cleanedDirt++;
                    delete dirtMap[currentPosition.x][currentPosition.y];
                }
            }
            break;
        case 'W':
            if(currentPosition.x==0){
                return;
            }
            else{
                currentPosition.x-=1;
                if(dirtMap[currentPosition.x] && dirtMap[currentPosition.x][currentPosition.y]){
                    cleanedDirt++;
                    delete dirtMap[currentPosition.x][currentPosition.y];
                }
            }
            break;
        case 'E':
            if(currentPosition.x==(map.width-1)){
                return;
            }
            else{
                currentPosition.x+=1;
                if(dirtMap[currentPosition.x] && dirtMap[currentPosition.x][currentPosition.y]){
                    cleanedDirt++;
                    delete dirtMap[currentPosition.x][currentPosition.y];
                }
            }
            break;
    }
}

var __isInt=function(n){
    return Number(n) == n && n % 1 == 0;
}

module.exports=robotHelper;