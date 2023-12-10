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

const newCoordinatesCalculator = (currentCoordinates : number[], directionOfTravel: string) : number[] => {
    switch (directionOfTravel) {
        case ("N"):
            return [currentCoordinates[0] - 1, currentCoordinates[1]];
        case ("E"):
            return [currentCoordinates[0], currentCoordinates[1] + 1];
        case ("S"):
            return [currentCoordinates[0] + 1, currentCoordinates[1]];
        case ("W"):
            return [currentCoordinates[0], currentCoordinates[1] - 1];
        default:
            return currentCoordinates;
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

    // PART 1
    // I think S has to connect to the North and the East, because South and West pipes miss it (have a corner) - 
    // code below matches that hypothesis
    let potentialStartPoints : string[][] = [
        ["N", pipeMap[sLocation[0] - 1][sLocation[1]]], 
        ["E", pipeMap[sLocation[0]][sLocation[1] + 1]], 
        ["S", pipeMap[sLocation[0] + 1][sLocation[1]]], 
        ["W", pipeMap[sLocation[0]][sLocation[1] - 1]]
    ]

    let potentialNextCoordinates : number[][] = [
        [sLocation[0] - 1, sLocation[1]], 
        [sLocation[0], sLocation[1] + 1], 
        [sLocation[0] + 1, sLocation[1]], 
        [sLocation[0], sLocation[1] - 1]
    ];

    let directionOneSteps : number[][] = [sLocation];
    let directionOneCompass: string[] = [];

    let directionTwoSteps : number[][] = [sLocation];
    let directionTwoCompass: string[] = [];
    
    for (let i : number = 0; i < potentialStartPoints.length; i++) {

        if (checkIfPipeCanJoin(potentialStartPoints[i][0], potentialStartPoints[i][1])) {
            if (directionOneSteps.length === 1) { 
                directionOneSteps.push(potentialNextCoordinates[i]);
                directionOneCompass.push(potentialStartPoints[i][0]);
                directionOneCompass.push(nextDirection(potentialStartPoints[i][0], pipeMap[potentialNextCoordinates[i][0]][potentialNextCoordinates[i][1]]));
            } else {
                directionTwoSteps.push(potentialNextCoordinates[i]);
                directionTwoCompass.push(potentialStartPoints[i][0]);
                directionTwoCompass.push(nextDirection(potentialStartPoints[i][0], pipeMap[potentialNextCoordinates[i][0]][potentialNextCoordinates[i][1]]));
            }
        }
    }

    while (true) {
        let currentDirectionOneStep : string = directionOneCompass.slice(-1)[0];
        let nextCoordinatesDirectionOne : number[] = newCoordinatesCalculator(directionOneSteps.slice(-1)[0], currentDirectionOneStep);
        directionOneSteps.push(nextCoordinatesDirectionOne);
        directionOneCompass.push(nextDirection(currentDirectionOneStep, pipeMap[nextCoordinatesDirectionOne[0]][nextCoordinatesDirectionOne[1]]));

        let currentDirectionTwoStep : string = directionTwoCompass.slice(-1)[0];
        let nextCoordinatesDirectionTwo : number[] = newCoordinatesCalculator(directionTwoSteps.slice(-1)[0], currentDirectionTwoStep);
        directionTwoSteps.push(nextCoordinatesDirectionTwo);
        directionTwoCompass.push(nextDirection(currentDirectionTwoStep, pipeMap[nextCoordinatesDirectionTwo[0]][nextCoordinatesDirectionTwo[1]]));

        if ((directionOneSteps.slice(-1)[0][0] === directionTwoSteps.slice(-1)[0][0]) 
            && (directionOneSteps.slice(-1)[0][1] === directionTwoSteps.slice(-1)[0][1])
        ) {
            break;
        }
    }

    let numberOfSteps = directionTwoSteps.length - 1;
    // PART 2

    return [numberOfSteps, 2];
}