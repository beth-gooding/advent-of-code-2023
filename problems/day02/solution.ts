import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day02/input.txt';

type ColourLimits = {[ key: string]: number}

export const dayTwoSolution = async () : Promise<number[]> => {
    let gameRecordInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    const colourLimits : ColourLimits = {
        "red": 12,
        "green": 13,
        "blue": 14
    }

    let sumOfPossibleGamesId : number = 0;

    for await (let gameLine of gameRecordInterface) {

        // PART 1
        let splitRegex : RegExp = new RegExp(":|,|;| ", "g");
        let cubesArray : string[] = gameLine.split(splitRegex).filter((s: string) => s !== "");
        const round : number = Number(cubesArray[1]);
        cubesArray = cubesArray.slice(2);

        let cubeAmount : number;
        let cubeColour: string;
        let addNumber: boolean;
        for (let i : number = 0; i < cubesArray.length - 1; i += 2) {
            cubeAmount = Number(cubesArray[i]);
            cubeColour = cubesArray[i+1];
            addNumber = true;

            if (cubeAmount > 14) { 
                addNumber = false;
                break; 
            }

            if (cubeAmount > 13 && cubeColour !== "blue") {
                addNumber = false;
                break;
            }

            if (cubeAmount > 12 && cubeColour === "red") {
                addNumber = false;
                break;
            }
        }

        addNumber ? sumOfPossibleGamesId += round : null;


        // PART 2

    }

    return [sumOfPossibleGamesId, 2];
}