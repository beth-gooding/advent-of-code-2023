import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day06/input.txt';

const quadraticEquationSqrt  = (a : number, b : number, c : number) : number => {
    return Math.sqrt((Math.pow(b, 2) - (4 * a * c)));
}

const calculateNumberOfWinningWays = (time : number, recordDistance : number) : number => {
        let shortestTime : number = (time - quadraticEquationSqrt(1, time, recordDistance))/2;
        let longestTime : number = (time + quadraticEquationSqrt(1, time, recordDistance))/2;

        if (shortestTime % 1 === 0) {
            shortestTime += 1;
        } else {
            shortestTime = Math.ceil(shortestTime);
        }

        if (longestTime % 1 === 0) {
            longestTime -= 1;
        } else {
            longestTime = Math.floor(longestTime);
        }

        return longestTime - shortestTime + 1; 
}

export const daySixSolution = async () : Promise<number[]> => {
    let boatRaceInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let raceArray : string[][] = [];
    for await (let line of boatRaceInterface) {
        // SET UP
        raceArray.push(line.split(" ").filter((s: string) => s !== ""));
    }

    let productOfNumberOfRaceWinningScenarios : number = 1;
    let actualRaceNumberOfWinningScenarios : number = 0;
    // PART 1
    for (let raceNumber: number = 1; raceNumber < raceArray[0].length - 1; raceNumber++) {
        let time : number = Number(raceArray[0][raceNumber]);
        let recordDistance : number = Number(raceArray[1][raceNumber]);
        let numberOfWaysToBeatRecord = calculateNumberOfWinningWays(time, recordDistance);
        productOfNumberOfRaceWinningScenarios *= numberOfWaysToBeatRecord;
    }

    // PART 2
    let actualRaceTime : number = Number(raceArray[0][5]);
    let actualRecordDistance : number = Number(raceArray[1][5]);
    actualRaceNumberOfWinningScenarios += calculateNumberOfWinningWays(actualRaceTime, actualRecordDistance);

    return [productOfNumberOfRaceWinningScenarios, actualRaceNumberOfWinningScenarios];
}