import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day04/input.txt';

export const dayFourSolution = async () : Promise<number[]> => {
    let scratchCardInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });


    for await (let scratchCard of scratchCardInterface) {

        // PART 1


        // PART 2

    }

    return [1, 2];
}