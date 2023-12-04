import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day04/input.txt';

export const dayFourSolution = async () : Promise<number[]> => {
    let scratchCardInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let totalPointsWorth : number = 0;
    let totalNumberOfScratchCards: number = 0;
    let numberOfEachScratchCard: number[] = [0];
    let index : number = 0;

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

        if (amountOfWins > 0 ) {totalPointsWorth += Math.pow(2, amountOfWins - 1)};

        // PART 2
        if (!numberOfEachScratchCard[index]) {
            numberOfEachScratchCard[index] = 1
        } else {
            numberOfEachScratchCard[index] = numberOfEachScratchCard[index] + 1;
        }

        for (let i = index + 1; i <= index + amountOfWins; i++) {
            if (!numberOfEachScratchCard[i]) {
                numberOfEachScratchCard[i] = 0
            }
            numberOfEachScratchCard[i] = numberOfEachScratchCard[i] + numberOfEachScratchCard[index];
        }

        index++;
    }

    totalNumberOfScratchCards = numberOfEachScratchCard.reduce((a, b) =>  a + b, 0);

    return [totalPointsWorth, totalNumberOfScratchCards];
}