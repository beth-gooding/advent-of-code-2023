import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day08/input.txt';

let directionToIndex : {[key: string]: number} = {
    "L": 0,
    "R": 1
}

export const dayEightSolution = async () : Promise<number[]> => {
    let inputInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let mapInstructions : string[] = [];
    for await (let line of inputInterface) {
        line !== "" ? mapInstructions.push(line) : null;
    }

    // PART 1
    let movesPattern : string = mapInstructions.shift();

    let usableMapInstructions : {[key: string]: string[]}
    for ( let mapInstruction of mapInstructions) {
        usableMapInstructions = {...usableMapInstructions, [mapInstruction.split(" ")[0]]: [mapInstruction.split("=")[1].split(",")[0].slice(2), mapInstruction.split("=")[1].split(",")[1].slice(1,4)]}
    }

    const findNextNode = (mapNode: string, direction: string) : string => {
        return usableMapInstructions[mapNode][directionToIndex[direction]];
    }

    let currentNode : string = "AAA";
    let moveNumber : number = 0;
    while(currentNode !== "ZZZ") {
        currentNode = findNextNode(currentNode, movesPattern[moveNumber % movesPattern.length])
        moveNumber++
    }

    // PART 2
    let currentNodes : string[] = Object.keys(usableMapInstructions).filter(( key : string) => key.charAt(2) === "A");
    let ghostModeMoveNumber : number[] = Array(currentNodes.length).fill(0);
    let numberOfNodes : number = currentNodes.length;

        for (let nodeNumber : number = 0; nodeNumber < numberOfNodes; nodeNumber++ ) {
            while(currentNodes[nodeNumber][2] !== "Z") {
            currentNodes[nodeNumber] = findNextNode(currentNodes[nodeNumber], movesPattern[ghostModeMoveNumber[nodeNumber] % movesPattern.length]);
            ghostModeMoveNumber[nodeNumber]++;
            }
        }

    const gcd = (a : number, b : number) => a ? gcd(b % a, a) : b;
    const lcm = (a : number, b : number) => a * b / gcd(a, b);

    // Lucky guess that the lowestCommonMultiple is actually the answer - need to understand why that actually works
    let zLowestCommonMultiple = ghostModeMoveNumber.reduce(lcm);

    return [moveNumber, zLowestCommonMultiple];
}