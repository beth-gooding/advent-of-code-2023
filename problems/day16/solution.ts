import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day16/exampleInput.txt';

export const daySixteenSolution = async () : Promise<number[]> => {
    let contraptionMapInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let contraptionMap : string[] = [];
    for await (let mapLine of contraptionMapInterface) {
        contraptionMap.push(mapLine);
    }
    console.log(contraptionMap)

    let currentDirection : string = "R";
    let energisedTiles : number[][] = [];

    // PART 1
    

    // PART 2

    return [1, 2];
}