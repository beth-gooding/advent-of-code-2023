import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day10/input.txt';

const pipeDirections : {[key: string] : string} = {
    "|": "NS",
    "-": "EW",
    "L": "NE",
    "J": "NW",
    "7": "SW",
    "F": "SE",
    ".": "nothing",
    "S": "start",
}

const checkIfPipeCanJoin = (directionOfTravel: string, pipeInThatDirection) : boolean => {
    switch (directionOfTravel) {
        case ("N"):
            if (["|", "7", "F"].includes(pipeInThatDirection)) {return true;}
            return false;
        case ("E"):
            if (["-", "J", "7"].includes(pipeInThatDirection)) {return true;}
            return false;
        case ("S"):
            if (["|", "L", "J"].includes(pipeInThatDirection)) {return true;}
            return false;
        case ("W"):
            if (["-", "L", "F"].includes(pipeInThatDirection)) {return true;}
            return false;
        default:
            return false;
    }
}

const nextDirection = (currentDirection : string, pipeTravellingThrough: string) : string => {
    switch (currentDirection) {
        case ("|"):
        case ("-") :
            return currentDirection;
        case ("N") :
            return pipeDirections[pipeTravellingThrough].split("S").join("");
        case ("E") :
            return pipeDirections[pipeTravellingThrough].split("W").join("");
        case ("S") :
            return pipeDirections[pipeTravellingThrough].split("N").join("");
        case ("W") :
            return pipeDirections[pipeTravellingThrough].split("E").join("");
        default:
            return currentDirection;
    }
}


export const dayTenSolution = async () : Promise<number[]> => {
    let inputInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let pipeMap : string[] = [];
    let sLocation: number[] = [];
    for await (let line of inputInterface) {
        pipeMap.push(line);
        if (line.includes("S")) {
            sLocation.push(pipeMap.length - 1);
            sLocation.push(line.indexOf("S"));
        }
    }

    console.log("Should say S: ", pipeMap[sLocation[0]][sLocation[1]]);

    // PART 1
    // I think S has to connect to the North and the East, because South and West pipes miss it (have a corner) - 
    // code below matches that hypothesis
    console.log("N", checkIfPipeCanJoin("N", pipeMap[sLocation[0] - 1][sLocation[1]]), pipeMap[sLocation[0] - 1][sLocation[1]]);
    console.log("E", checkIfPipeCanJoin("E", pipeMap[sLocation[0]][sLocation[1] + 1]), pipeMap[sLocation[0]][sLocation[1] + 1]);
    console.log("S", checkIfPipeCanJoin("S", "F"), pipeMap[sLocation[0] + 1][sLocation[1]]);
    console.log("W", checkIfPipeCanJoin("W", pipeMap[sLocation[0]][sLocation[1] - 1]), pipeMap[sLocation[0]][sLocation[1] - 1]);

    console.log("Should say N: ", nextDirection("N", pipeMap[sLocation[0] - 1][sLocation[1]]));
    console.log("Should say S: ", nextDirection("E", pipeMap[sLocation[0]][sLocation[1] + 1]));

    // So - have a function to check which pipes can join to current pipe, and one to calculate the direction of the next pipe.
    // Now just need a smart way to step through the algorithm, and record how many steps have been taken
    // Probably shouldn't assume the loop has an even number of steps - so both directions might not hit the same index at the same time.
    // PART 2

    return [1, 2];
}