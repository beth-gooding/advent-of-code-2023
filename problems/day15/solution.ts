import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day15/input.txt';

export const dayFifteenSolution = async () : Promise<number[]> => {
    let inputInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });


    for await (let line of inputInterface) {

        // PART 1


        // PART 2

    }

    return [1, 2];
}