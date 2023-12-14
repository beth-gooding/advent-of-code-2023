import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day14/input.txt';

export const dayFourteenSolution = async () : Promise<number[]> => {
    let rockMapInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let rockMapArray :  string[] = [];
    for await (let line of rockMapInterface) {
        rockMapArray.push(line);
    }

    // PART 1
    let totalLoadOnNorthBeams : number = 0;

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
                totalLoadOnNorthBeams += (rockMapArray.length - tiltedRowIndex);
                numberOfRocksTracked += 1;
                continue;
            }
        }
    }
    // PART 2

    return [totalLoadOnNorthBeams, 2];
}