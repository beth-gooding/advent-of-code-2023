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

    let instructions : string[][] = [];
    for await (let instruction of digInstructionsInterface) {
        instructions.push(instruction.split(" "));
    }

    // PART 1
    let trench : number[][] = [[0, 0]];
    let corners : number[][] = [];

    for (let instructionIndex : number = 0; instructionIndex < instructions.length; instructionIndex++) {

        trench.push(...nextTrenchSquares(instructions[instructionIndex][0], Number(instructions[instructionIndex][1]), trench.slice(-1)[0]));
        
        if (instructions[instructionIndex][0] !== instructions[(instructionIndex + 1) % instructions.length][0]) {
            corners.push(trench.at(-1));
        }
    }

    let shoelaceTheoremSumPositive : number = 0;
    let shoelaceTheoremSumNegative : number = 0;

    // find the squares inside the border trench
    for (let coordinateNumber : number = 0; coordinateNumber < corners.length; coordinateNumber++) {
        shoelaceTheoremSumPositive += (corners[coordinateNumber][0] * corners[(coordinateNumber + 1) % corners.length][1]); 
        shoelaceTheoremSumNegative += (corners[coordinateNumber][1] * corners[(coordinateNumber + 1) % corners.length][0]);

        console.log(shoelaceTheoremSumPositive, shoelaceTheoremSumNegative)
    }

    console.log(corners)

    let lagoonArea = Math.abs(shoelaceTheoremSumPositive - shoelaceTheoremSumNegative) / 2;

    // too low: Math.abs(shoelaceTheoremSum / 2) = 
    // too high: Math.abs(shoelaceTheoremSum / 2) + trench.length - 1;

    // PART 2

    return [lagoonArea, 2];
}