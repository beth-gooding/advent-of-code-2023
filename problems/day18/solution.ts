import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day18/input.txt';

export const dayEighteenSolution = async () : Promise<number[]> => {
    let inputInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });


    for await (let line of inputInterface) {

        // PART 1


        // PART 2

    }

    return [1, 2];
}