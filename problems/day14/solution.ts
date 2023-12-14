import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day14/input.txt';

const northTilt = (rockMapArray: string[]) : number => {
    let totalLoad = 0;
    for (let columnIndex : number = 0; columnIndex < rockMapArray[0].length; columnIndex++) {
        let closestCubeRock : number = -1;
        let numberOfRocksTracked : number = 0;

        for (let rowIndex: number = 0; rowIndex < rockMapArray.length; rowIndex++) {
            if (rockMapArray[rowIndex][columnIndex] === ".") {
                // Don't care, don't do anything
                continue;
            }

            if (rockMapArray[rowIndex][columnIndex] === "#") {
                // Set a new reference point for cube rocks, nothing else can go above it
                closestCubeRock = rowIndex;

                // set the number of rocks tracked as 1, so that round rocks don't fall to the cube rock's index
                numberOfRocksTracked = 1;
                continue;
            }
            
            if (rockMapArray[rowIndex][columnIndex] === "O") {
                // the titledRowIndex will be equal to max(0, #.location) + number of O rocks above it
                let tiltedRowIndex : number = (Math.max(0, closestCubeRock) + numberOfRocksTracked);
                totalLoad += (rockMapArray.length - tiltedRowIndex);
                numberOfRocksTracked += 1;
                continue;
            }
        }
    }
    return totalLoad;
}

const westTilt = (rockMapArray: string[]) => {

    for (let rowIndex : number = 0; rowIndex < rockMapArray.length; rowIndex++) {
        let closestCubeRock : number = -1;
        let numberOfRocksTracked : number = 0;
        for (let columnIndex : number = 0; columnIndex < rockMapArray[rowIndex].length; columnIndex++) {
            if (rockMapArray[rowIndex][columnIndex] === ".") {
                continue;
            } 

            if (rockMapArray[rowIndex][columnIndex] === "#") {
                closestCubeRock = columnIndex;
                numberOfRocksTracked = 1;
                continue;
            }

            if (rockMapArray[rowIndex][columnIndex] === "O") {
                let tiltedColumnIndex : number = (Math.max(0, closestCubeRock) + numberOfRocksTracked);
                numberOfRocksTracked += 1;
                continue;
            }
        }
    }

};

const southTilt = (rockMapArray : string[]) => {
    for (let columnIndex : number = rockMapArray[0].length - 1; columnIndex >= 0; columnIndex--) {
        let closestCubeRock : number = -1;
        let numberOfRocksTracked : number = 0;
        for (let rowIndex : number = rockMapArray.length - 1; rowIndex >= 0; rowIndex--) {
            if (rockMapArray[rowIndex][columnIndex] === ".") {
                continue;
            } 

            if (rockMapArray[rowIndex][columnIndex] === "#") {
                closestCubeRock = columnIndex;
                numberOfRocksTracked = 1;
                continue;
            }

            if (rockMapArray[rowIndex][columnIndex] === "O") {
                let tiltedRowIndex : number = (Math.max(0, closestCubeRock) + numberOfRocksTracked);
                numberOfRocksTracked += 1;
                continue;
            }
        }
    }
};

const eastTilt = (rockMapArray : string[]) => {
    for (let rowIndex : number = rockMapArray.length - 1; rowIndex >= 0; rowIndex--) {
        let closestCubeRock : number = -1;
        let numberOfRocksTracked : number = 0;
        for (let columnIndex : number = rockMapArray[0].length - 1; columnIndex >= 0; columnIndex--) {
            if (rockMapArray[rowIndex][columnIndex] === ".") {
                continue;
            } 

            if (rockMapArray[rowIndex][columnIndex] === "#") {
                closestCubeRock = columnIndex;
                numberOfRocksTracked = 1;
                continue;
            }

            if (rockMapArray[rowIndex][columnIndex] === "O") {
                let tiltedColumnIndex : number = (Math.max(0, closestCubeRock) + numberOfRocksTracked);
                numberOfRocksTracked += 1;
                continue;
            }
        }
    }
};

export const dayFourteenSolution = async () : Promise<number[]> => {
    let rockMapInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let rockMapArray :  string[] = [];
    for await (let line of rockMapInterface) {
        rockMapArray.push(line);
    }

    // PART 1
    let totalLoadOnNorthBeams : number = northTilt(rockMapArray);

    // PART 2
        let totalLoadAfterCycles : number = 0;

        // totalLoadAfterCycles = calculateLoad();
    return [totalLoadOnNorthBeams, totalLoadAfterCycles];
}