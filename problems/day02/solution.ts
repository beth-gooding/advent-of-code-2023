import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day02/input.txt';

type ColourObjects = {[ key: string]: number}

export const dayTwoSolution = async () : Promise<number[]> => {
    let gameRecordInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    const colourLimits : ColourObjects = {
        "red": 12,
        "green": 13,
        "blue": 14
    }

    let sumOfPossibleGamesId : number = 0;
    let sumOfPowers: number = 0;

    for await (let gameLine of gameRecordInterface) {

        // SETUP
        let splitRegex : RegExp = new RegExp(":|,|;| ", "g");
        let cubesArray : string[] = gameLine.split(splitRegex).filter((s: string) => s !== "");
        const round : number = Number(cubesArray[1]);
        cubesArray = cubesArray.slice(2);


        // PART 1
        let cubeAmount : number;
        let cubeColour: string;
        let addNumber: boolean;
        for (let i : number = 0; i < cubesArray.length - 1; i += 2) {
            cubeAmount = Number(cubesArray[i]);
            cubeColour = cubesArray[i+1];
            addNumber = true;

            if (cubeAmount > colourLimits["blue"]) { 
                addNumber = false;
                break; 
            }

            if (cubeAmount > colourLimits["green"] && cubeColour !== "blue") {
                addNumber = false;
                break;
            }

            if (cubeAmount > colourLimits["red"] && cubeColour === "red") {
                addNumber = false;
                break;
            }
        }

        addNumber ? sumOfPossibleGamesId += round : null;


        // PART 2
        let power : number = 1;
        let maxPerColour : ColourObjects = {
            "red": 0,
            "green": 0,
            "blue": 0
        }

        for (let i : number = 0; i < cubesArray.length - 1; i += 2) {
            cubeAmount = Number(cubesArray[i]);
            cubeColour = cubesArray[i+1];



            if (maxPerColour[cubeColour] < cubeAmount) {
                maxPerColour[cubeColour] = cubeAmount;
            }
        }
        power = maxPerColour["red"] * maxPerColour["green"] * maxPerColour["blue"];
        sumOfPowers +=power;
    }

    return [sumOfPossibleGamesId, sumOfPowers];
}