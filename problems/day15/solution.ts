import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day15/input.txt';

const hashValue = (inputString : string) : number => {
    let workingInputValue : number = 0;

    for (let i : number = 0; i < inputString.length; i++) {
        workingInputValue += inputString.charCodeAt(i);
        workingInputValue *= 17;
        workingInputValue = workingInputValue % 256
    }

    return workingInputValue;
}

export const dayFifteenSolution = async () : Promise<number[]> => {
    let initialisationInputInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let initialisationInput : string[] = [];
    for await (let line of initialisationInputInterface) {
        initialisationInput = line.split(",");
    }

    // PART 1 and 2
    let totalHashResults : number = 0;
    let boxHashMap : {[key : number] : string[]} = {};
    for (let input of initialisationInput) {
        // Part 1
        totalHashResults += hashValue(input);

        // Part 2
        let boxNumber : number = hashValue(input.split(/-|=/).join("").replace(/[0-9]/, ""));
        let boxLabelAndLens : string = input.split(/-|=/).join("");

        if (input.includes("-")) {
            if (boxHashMap[boxNumber]?.filter((s: string) => s.includes(boxLabelAndLens.replace(/[0-9]/, ""))).length > 0) {
                let actualEntry = boxHashMap[boxNumber].filter((s: string) => s.includes(boxLabelAndLens.replace(/[0-9]/, "")))[0]
                let indexOfLabel : number = boxHashMap[boxNumber].indexOf(actualEntry);
                boxHashMap[boxNumber] = [...boxHashMap[boxNumber].slice(0, indexOfLabel), ...boxHashMap[boxNumber].slice(indexOfLabel + 1)];
                continue;
            }
        }

        if (input.includes("=")) {
            if (boxHashMap[boxNumber]?.filter((s: string) => s.includes(boxLabelAndLens.replace(/[0-9]/, ""))).length > 0) {
                let actualEntry = boxHashMap[boxNumber].filter((s: string) => s.includes(boxLabelAndLens.replace(/[0-9]/, "")))[0]
                let indexOfLabel : number = boxHashMap[boxNumber].indexOf(actualEntry);
                boxHashMap[boxNumber] = [...boxHashMap[boxNumber].slice(0, indexOfLabel), boxLabelAndLens, ...boxHashMap[boxNumber].slice(indexOfLabel + 1)];
                continue;
            } 
            
            if (boxHashMap[boxNumber]) {
                boxHashMap[boxNumber] = [...boxHashMap[boxNumber], boxLabelAndLens];
                continue;
            }

            if (boxHashMap[boxNumber] === undefined) {
                boxHashMap[boxNumber] = [boxLabelAndLens];
            }
        }
    }

    console.log(boxHashMap)

    let focussingPower = 0;

    for (let box of Object.keys(boxHashMap)) {
        let numberBox : number = Number(box);
        for (let i :  number = 0; i < boxHashMap[numberBox].length; i++) {
            console.log("hello", boxHashMap[numberBox][i].replace(/[a-zA-Z]/g, ""))
            focussingPower += ((numberBox + 1) * (i + 1) * (Number(boxHashMap[numberBox][i].replace(/[a-zA-Z]/g, ""))));
        }
    }


    return [totalHashResults, focussingPower];
}