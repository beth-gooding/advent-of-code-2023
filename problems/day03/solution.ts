import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day03/input.txt';

const checkIfSymbol = (character: string) : boolean => {
    if (character !== "." && character.match(/[^a-zA-Z0-9]/)) {
        return true;
    }
    return false;
}

export const dayThreeSolution = async () : Promise<number[]> => {
    let engineSchematicInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let engineSchematicMatrix : string[] = [];
    let sumEnginePartNumbers: number = 0;
    for await (let engineSchematicLine of engineSchematicInterface) {
        engineSchematicMatrix.push(engineSchematicLine);
    }

    // PART 1 
    for (let rowNumber: number = 0; rowNumber < engineSchematicMatrix.length; rowNumber++) {
        let row : string = engineSchematicMatrix[rowNumber];
        for (let columnNumber: number = 0; columnNumber < row.length; columnNumber++) {
            // If the character is a not a digit, do nothing
            if (row.charAt(columnNumber).match(/\D/g)) {continue;}

            // If the character is a digit, look for surrounding symbols
            if (row.charAt(columnNumber).match(/\d/g)) {
                let startingCoordinates = [rowNumber, columnNumber];
                let potentialEngineNumberToAdd : string = "";
                while (row.charAt(columnNumber).match(/\d/g)) {
                    potentialEngineNumberToAdd += row.charAt(columnNumber);
                    columnNumber++;
                }

                // use logic for the bounds to capture all cases in one double for loop
                for (let i : number = Math.max(startingCoordinates[0] - 1,0); i <= Math.min(startingCoordinates[0] + 1, engineSchematicMatrix.length - 1); i++) {
                    for (let j : number = Math.max(startingCoordinates[1] - 1, 0); j <= Math.min(startingCoordinates[1] + potentialEngineNumberToAdd.length, row.length - 1); j++) {
                        if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                            sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                            break;
                        }
                    }
                }        
            }
        }
    }

    // If something is a part number, write a function to check if the symbol is a star, and if it is store the coordinates of the star, or a count per coordinate to see if a coordinate appears more than once
    // Would need to store co-ordinate and part number, so that part numbers can be multiplied together later

    return [sumEnginePartNumbers, 2];
}