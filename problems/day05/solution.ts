import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day05/exampleInput.txt';

const mapStages : string[] = [
    "seed-to-soil map:", 
    "soil-to-fertilizer map:", 
    "fertilizer-to-water map:", 
    "water-to-light map:", 
    "light-to-temperature map:", 
    "temperature-to-humidity map:", 
    "humidity-to-location map:", 
    "end"
];

const mapPiecesCreator = (almanac: string[], mapSection: string, nextMapSection: string) : number[][] => {
    
    if (nextMapSection === "end") {
        let almanacLength = almanac.length;
        let tempMapPieces : string[] = almanac.slice(almanac.indexOf(mapSection) + 1, almanacLength - 1);
        let mapPieces = tempMapPieces.map((s : string) => {return s.split(" ").map((char : string) => Number(char))});
        return mapPieces;
    }

    let tempMapPieces : string[] = almanac.slice(almanac.indexOf(mapSection) + 1, almanac.indexOf(nextMapSection) - 1);
    let mapPieces = tempMapPieces.map((s : string) => {return s.split(" ").map((char : string) => Number(char))});
    return mapPieces;
}

const rangeCalculator = (destinationStartPoint : number, sourceStartPoint : number, rangeLength: number) : {} => {
    let newMapPart = {};
    let destinationMapValue : number = destinationStartPoint;
    for (let i : number = sourceStartPoint; i < (sourceStartPoint + rangeLength); i++) {
        newMapPart = {...newMapPart, [i]: destinationMapValue }
        destinationMapValue++;
    }

    return newMapPart;
}

export const dayFiveSolution = async () : Promise<number[]> => {
    let almanacInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let almanacArray : string[] = [];
    for await (let line of almanacInterface) {
        almanacArray.push(line);

    }

    let lowestLocationNumber : number;

    // PART 1
    let stageOutputs : number[][] = [almanacArray[0].split(" ").splice(1).map((a : string) => Number(a))];

    for (let stageNumber : number = 0; stageNumber < mapStages.length - 1; stageNumber++) {
        let currentStageMapPieces = mapPiecesCreator(almanacArray, mapStages[stageNumber], mapStages[stageNumber + 1]);
        console.log("log 1: ", currentStageMapPieces)
        let currentStageMap = {};
        for (let currentStageRow : number = 0; currentStageRow < currentStageMapPieces.length; currentStageRow++) {
            let rowToConvert : number[] = currentStageMapPieces[currentStageRow];
            let newMapInformation = rangeCalculator(rowToConvert[0], rowToConvert[1], rowToConvert[2]);
            currentStageMap = {...currentStageMap, ...newMapInformation};
        }
        console.log("log 2: ", currentStageMap)

        let currentStageOutput : number[] = [];
        for (let item of stageOutputs[stageNumber]) {
            if (!currentStageMap[item]) {
                currentStageOutput.push(item);
                continue;
            }
            currentStageOutput.push(currentStageMap[item]);
            console.log("log 3: ", currentStageOutput);
        }
        stageOutputs.push(currentStageOutput);
        lowestLocationNumber = Math.min(...stageOutputs.slice(-1)[0]);
        console.log("log 4: ", stageOutputs)
    }
    // PART 2

    return [lowestLocationNumber, 2];
}