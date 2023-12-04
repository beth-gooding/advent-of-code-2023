import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day04/input.txt';

export const dayFourSolution = async () : Promise<number[]> => {
    let scratchCardInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let totalPointsWorth : number = 0;
    for await (let scratchCard of scratchCardInterface) {

        // PART 1
        let amountOfWins: number = 0;

        let scratchCardParts : string[] = scratchCard.split(/:|\|/g);
        let scratchCardWinningNumbers : string[] = scratchCardParts[1].split(" ").filter((s: string) => s !== "");
        let scratchCardActualNumbers: string[] = scratchCardParts[2].split(" ").filter((s: string) => s !== "");
        
        for (let winningNumber of scratchCardWinningNumbers) {
            if (scratchCardActualNumbers.includes(winningNumber)) {
                amountOfWins++;
            }
        }

        amountOfWins > 0 
            ? totalPointsWorth += Math.pow(2, amountOfWins - 1) 
            : null;

        // PART 2

    }

    return [totalPointsWorth, 2];
}