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

                // if not on the outside of the grid, check the whole way around the potential engine part number
                if ((startingCoordinates[0] !== 0) && (startingCoordinates[0] !== engineSchematicMatrix.length -1) && (startingCoordinates[1] !== 0) && (startingCoordinates[1] !== row.length - 1)) {
                    for (let i : number = startingCoordinates[0] - 1; i <= startingCoordinates[0] + 1; i++) {
                        for (let j : number = startingCoordinates[1] - 1; j <= startingCoordinates[1] + potentialEngineNumberToAdd.length; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                }

                // if you're in the top left corner, only check below and to the right
                if (startingCoordinates[0] === 0 && startingCoordinates[1] === 0){
                    for (let i : number = 0; i <= 1; i++) {
                        for (let j : number = 0; j <= potentialEngineNumberToAdd.length; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                }

                // if you're in the top right corner, only check below and to the left
                if (startingCoordinates[0] === 0 && (startingCoordinates[1] + potentialEngineNumberToAdd.length) === row.length){
                    for (let i : number = startingCoordinates[0]; i <= 1; i++) {
                        for (let j : number = startingCoordinates[1] - 1; j <= startingCoordinates[1] + potentialEngineNumberToAdd.length - 1; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                }

                // if you're in the bottom left corner, only check above and to the right
                if (startingCoordinates[0] === engineSchematicMatrix.length - 1 && startingCoordinates[1] === 0){
                    for (let i : number = startingCoordinates[0] - 1; i <= startingCoordinates[0]; i++) {
                        for (let j : number = startingCoordinates[1]; j <= startingCoordinates[1] + potentialEngineNumberToAdd.length; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                }

                // if you're in the bottom right corner, only check above and to the left
                if (startingCoordinates[0] === engineSchematicMatrix.length - 1 && (startingCoordinates[1] + potentialEngineNumberToAdd.length) === row.length){
                    for (let i : number = startingCoordinates[0] - 1; i <= startingCoordinates[0]; i++) {
                        for (let j : number = startingCoordinates[1] - 1; j <= startingCoordinates[1] + potentialEngineNumberToAdd.length - 1; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                }

                // if you're in the first row, only check below, to the right, and to the left
                if (startingCoordinates[0] === 0){
                    for (let i : number = 0; i <= 1; i++) {
                        for (let j : number = startingCoordinates[1] - 1; j <= startingCoordinates[1] + potentialEngineNumberToAdd.length; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                }

                // if you're in the last row, only check above, to the right, and to the left
                if (startingCoordinates[0] === engineSchematicMatrix.length - 1){
                    for (let i : number = startingCoordinates[0] - 1; i <= startingCoordinates[0]; i++) {
                        for (let j : number = startingCoordinates[1] - 1; j <= startingCoordinates[1] + potentialEngineNumberToAdd.length; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                } 
                
                // if you're starting in the first column, only check above, below, and to the right
                if (startingCoordinates[1] === 0){
                    for (let i : number = startingCoordinates[0] - 1; i <= startingCoordinates[0] + 1; i++) {
                        for (let j : number = 0; j <= potentialEngineNumberToAdd.length; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                } 

                // if you're in the last column, only check above, below, and to the left
                if (startingCoordinates[1] === row.length - 1){
                    for (let i : number = startingCoordinates[0] - 1; i <= startingCoordinates[0] + 1; i++) {
                        for (let j : number = startingCoordinates[1] - 1; j <= startingCoordinates[1]; j++) {
                            if (checkIfSymbol(engineSchematicMatrix[i].charAt(j))) {
                                sumEnginePartNumbers += Number(potentialEngineNumberToAdd);
                                break;
                            }
                        }
                    }
                    continue;
                }                
            }
        }
}

    return [sumEnginePartNumbers, 2];
}