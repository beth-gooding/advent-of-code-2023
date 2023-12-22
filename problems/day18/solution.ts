import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day18/exampleInput.txt';

const nextTrenchSquares = (direction: string, numberOfSquares : number, currentSquare: number[]) : number[][] => {
    let squaresToReturn : number[][] = [];
    switch (direction) {
        case "R":
            for (let i = currentSquare[1] + 1; i <= currentSquare[1] + numberOfSquares; i++) {
                squaresToReturn.push([currentSquare[0], i]);

            }
            return squaresToReturn;

        case "L":
            for (let i = currentSquare[1] - 1; i >= currentSquare[1] - numberOfSquares; i--) {
                squaresToReturn.push([currentSquare[0], i]);
            }
            return squaresToReturn;

        case "U":
            for (let i = currentSquare[0] - 1; i >= currentSquare[0] - numberOfSquares; i--) {
                squaresToReturn.push([i, currentSquare[1]]);
            }
            return squaresToReturn;

        case "D":
            for (let i = currentSquare[0] + 1; i <= currentSquare[0] + numberOfSquares; i++) {
                squaresToReturn.push([i, currentSquare[1]]);
            }
            return squaresToReturn;

        default:
            return squaresToReturn;
    }
}

export const dayEighteenSolution = async () : Promise<number[]> => {
    let digInstructionsInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let instructions : string[] = [];
    for await (let instruction of digInstructionsInterface) {
        instructions.push(instruction);
    }

    // PART 1
    console.log(instructions)
    let trench : number[][] = [[0, 0]];

    for (let instruction of instructions) {
        let instructionPieces : string[] = instruction.split(" ");
        
        trench.push(...nextTrenchSquares(instructionPieces[0], Number(instructionPieces[1]), trench.slice(-1)[0]));
    }

    console.log("The volume of the trench is", trench.length - 1);

    // PART 2

    return [1, 2];
}