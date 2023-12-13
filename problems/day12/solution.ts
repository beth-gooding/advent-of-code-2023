import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day12/exampleInput.txt';

const generatePascalsTriangle = (numRows: number): number[][] => {
    let pascalArray = [[1]];
    if (numRows === 1) {
        return pascalArray;
    } else {
        for (let i : number = 1; i < numRows; i++) {
            pascalArray.push([1]);
            for (let j : number = 0; j < pascalArray[i - 1].length - 1; j++) {
                pascalArray[i].push(
                    pascalArray[i - 1][j] + pascalArray[i - 1][j + 1]
                )
            }
            pascalArray[i].push(1);
        }
        return pascalArray;
    }
};

export const dayTwelveSolution = async () : Promise<number[]> => {
    let springRecordsInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let maxNumberNeeded = 0;
    for await (let springRecord of springRecordsInterface) {

        // PART 1
        let springRecordPieces : string[] = springRecord.split(" ");
        let springSizes : number[] = springRecordPieces.pop().split(",").map((s : string) => Number(s));
        console.log(springRecordPieces, springSizes)
        Math.max(...springSizes) > maxNumberNeeded ? maxNumberNeeded = Math.max(...springSizes) : null;
        springRecordPieces[0]


        const pascalsTriangle : number[][] = generatePascalsTriangle(maxNumberNeeded + 1);

        let knownSpringLocations : number[] = [];
        for (let charIndex : number = 0; charIndex < springRecordPieces[0].length; charIndex++) {
            let char = springRecordPieces[0].charAt(charIndex);
            if (char === "#") {
                knownSpringLocations.push(charIndex);
            }
        }
        console.log(knownSpringLocations)

        // PART 2

    }
    
    // Calculate pascals triangle to get all the binomial coefficients we might need
    
    // Look for some easy wins - where is it impossible to get the row e.g. not enough ? symbols, not enough gaps



    return [1, 2];
}