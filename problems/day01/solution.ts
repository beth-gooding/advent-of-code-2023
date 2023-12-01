import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day01/input.txt';

type NumbersMap = {[key : string]: string};

const numbersMap : NumbersMap = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

export const dayOneProblemOne = async () : Promise<number[]> => {
    let calibrationDocumentInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let calibrationValueSum : number = 0;
    let trueCalibrationValueSum: number = 0;

    for await (let calibrationLine of calibrationDocumentInterface) {
        let numbersInLine : string = calibrationLine.replace(/\D/g, "");
        calibrationValueSum += Number(numbersInLine.charAt(0) + numbersInLine.slice(-1));
        console.log("original line: " + calibrationLine)
        let trueNumbersInLine : string = calibrationLine;
        for (let number in numbersMap) {
            let numberWord : RegExp = new RegExp(number, "g");
            trueNumbersInLine = trueNumbersInLine.replace(numberWord, numbersMap[number]);
        }
        trueNumbersInLine = trueNumbersInLine.replace(/\D/g, "");

        console.log("all numbers: " + trueNumbersInLine);
        console.log("sum: " + trueNumbersInLine.charAt(0) + trueNumbersInLine.slice(-1))
        trueCalibrationValueSum += Number(trueNumbersInLine.charAt(0) + trueNumbersInLine.slice(-1));
        console.log(trueCalibrationValueSum);

    }

    return [calibrationValueSum, trueCalibrationValueSum];
}