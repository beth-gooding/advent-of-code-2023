import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day15/input.txt';

const hashValue = (inputString : string) : number => {
    let workingInputValue : number = 0;

    for (let i : number = 0; i < inputString.length; i++) {
        workingInputValue += inputString.charCodeAt(i);
        workingInputValue *= 17;
        workingInputValue = workingInputValue % 256
    }

    return workingInputValue;
}

export const dayFifteenSolution = async () : Promise<number[]> => {
    let initialisationInputInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let initialisationInput : string[] = [];
    for await (let line of initialisationInputInterface) {
        initialisationInput = line.split(",");
    }

    // PART 1
    let totalHashResults : number = 0;
    for (let input of initialisationInput) {
        totalHashResults += hashValue(input);
    }


    // PART 2

    return [totalHashResults, 2];
}