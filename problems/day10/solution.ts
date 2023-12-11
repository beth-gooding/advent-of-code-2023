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
    let fullLoopCoordinates : number[][] = [...directionOneSteps.slice(0, -1), ...directionTwoSteps.reverse()];
    let fullLoopDirections : string[] = [...directionOneCompass.slice(0, -1), ...directionTwoCompass.reverse()];
    console.log(fullLoopDirections)

    // create an array to store flood fill values in
    let partTwoMap : string[][] = [];
    for (let i : number = 0; i < pipeMap.length; i++) {
        partTwoMap.push(Array(pipeMap[0].length));
    }

    // fill in where the pipe is
    for (let i :  number = 0; i < fullLoopCoordinates.length; i++) {
        // this doesn't account for corner pieces having a vertical bit as well as a horizontal bit, need to fix
        if (["E", "W"].includes(fullLoopDirections[i])) {
            partTwoMap[fullLoopCoordinates[i][0]][fullLoopCoordinates[i][1]] = "H";
        } else {
            partTwoMap[fullLoopCoordinates[i][0]][fullLoopCoordinates[i][1]] = "V";
        }
    }

    const findInsidePointsAlgorithm = (coordinate : number[], numberOfCrossings : number) : void => {
        let pointOfInterest = partTwoMap[coordinate[0]][coordinate[1]]
        if (["I", "O", "V", "H"].includes(pointOfInterest)) {
            return;
        }

        if (numberOfCrossings % 2 === 1) {
            partTwoMap[coordinate[0]][coordinate[1]] = "I"
            return;
        } else {
            partTwoMap[coordinate[0]][coordinate[1]] = "O"
            return;
        }

    }

    let numberOfInsideTiles :  number = 0;
    for (let i : number = 1; i < pipeMap.length - 1; i++) {
        let numberOfCrossings = 0;

        // Fill in the outside tiles on the right edge
        for (let startRight : number = pipeMap[i].length - 1; startRight >= 0; startRight--) {
            if (!["V", "H"].includes(partTwoMap[i][startRight])) {
                partTwoMap[i][startRight] = "O"
            } else {
                break;
            }
        }

        // calculate the rest of the inside tiles
        for (let j : number = 0; j < pipeMap[i].length; j++) {
            if (partTwoMap[i][j] === "V") {numberOfCrossings++;}
            if (i === 3) {console.log(j, numberOfCrossings)}
            findInsidePointsAlgorithm([i,j], numberOfCrossings);
        }
        numberOfInsideTiles += partTwoMap[i].filter((s : string) => s === "I").length;
    }
    console.log(partTwoMap);

    return [numberOfSteps, numberOfInsideTiles];
}