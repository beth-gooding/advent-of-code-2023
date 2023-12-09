import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day09/input.txt';

const gapFinder = (inputArray : number[]) : number[] => {
    let outputArray : number[] = [];
    for (let i : number = 1; i < inputArray.length; i++) {
        outputArray.push(inputArray[i] - inputArray[i - 1]);
    }
    return outputArray;
}


export const dayNineSolution = async () : Promise<number[]> => {
    let oasisDataInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let sumOfForwardExtrapolatedValues : number = 0;
    let sumOfBackwardExtrapolatedValues : number = 0;
    for await (let dataSequence of oasisDataInterface) {

        // PART 1
        let dataArray : number[][] =  [];
        dataArray.push(dataSequence.split(" ").map((a : string) => {return Number(a)}));

        let lastRound : number = 0;
        let notAllGapsZero : boolean = true;
        while(notAllGapsZero) {
            dataArray.push(gapFinder(dataArray[lastRound]));
            lastRound++;
            if (!dataArray[lastRound].some((gap : number) => gap !== 0)) {notAllGapsZero = false;}
        }

        dataArray[lastRound].push(0);
        for (let index : number = lastRound; index > 0; index--) {
            dataArray[index - 1].push(dataArray[index - 1].slice(-1)[0] + dataArray[index].slice(-1)[0])
        }

        sumOfForwardExtrapolatedValues += dataArray[0].slice(-1)[0];

        // PART 2

        dataArray[lastRound].unshift(0);
        for (let backExtrapolationIndex : number = lastRound; backExtrapolationIndex > 0; backExtrapolationIndex--) {
            dataArray[backExtrapolationIndex - 1].unshift(dataArray[backExtrapolationIndex - 1][0] - dataArray[backExtrapolationIndex][0])
        }
        sumOfBackwardExtrapolatedValues += dataArray[0][0];
    }

    return [sumOfForwardExtrapolatedValues, sumOfBackwardExtrapolatedValues];
}