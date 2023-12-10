import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day05/input.txt';

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
    console.log(stageOutputs);
    for (let stageNumber : number = 0; stageNumber < mapStages.length - 1; stageNumber++) {
        let currentStageMapPieces = mapPiecesCreator(almanacArray, mapStages[stageNumber], mapStages[stageNumber + 1]);
        let currentStageMap = [];

        for (let currentStageRow : number = 0; currentStageRow < currentStageMapPieces.length; currentStageRow++) {
            let rowToConvert : number[] = currentStageMapPieces[currentStageRow];
            currentStageMap.push(rowToConvert);
        }
        currentStageMap.sort((a, b) => a[1] - b[1])

        let currentStageOutput : number[] = [];
        for (let item of stageOutputs[stageNumber]) {
            if (item < currentStageMap[0][1] 
                || item >= (currentStageMap[currentStageMap.length - 1][1] + currentStageMap[currentStageMap.length - 1][2])
            ) {
                currentStageOutput.push(item);
                continue;
            }

            for (let rangeIdentifierIndex : number = 0; rangeIdentifierIndex < currentStageMap.length; rangeIdentifierIndex++) {
                if (item >= currentStageMap[rangeIdentifierIndex][1] 
                    && item < (currentStageMap[rangeIdentifierIndex][1] + currentStageMap[rangeIdentifierIndex][2])
                ) {
                    currentStageOutput.push(currentStageMap[rangeIdentifierIndex][0] + (item - currentStageMap[rangeIdentifierIndex][1]));
                    break;
                }

                if (rangeIdentifierIndex === currentStageMap.length) {
                    currentStageOutput.push(item);
                }
            }
            
        }
        stageOutputs.push(currentStageOutput);
    }
    lowestLocationNumber = Math.min(...stageOutputs.slice(-1)[0]);

    // PART 2
    let trueLowestLocationNumber = 0;

    return [lowestLocationNumber, trueLowestLocationNumber];
}