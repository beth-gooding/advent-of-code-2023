import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day11/input.txt';

export const dayElevenSolution = async () : Promise<number[]> => {
    let universeInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let universeMap : string[] = [];
    let rowIndex : number = 0;
    let indicesToAddNewRowAt : number[] = [];
    for await (let line of universeInterface) {
        universeMap.push(line);

        // if this line doesn't have a galaxy, push it again
        if (!line.includes("#")) {
            // universeMap.push(line);
            indicesToAddNewRowAt.push(rowIndex + indicesToAddNewRowAt.length);
        }

        rowIndex++;
    }

    let originalNumberOfColumns : number = universeMap[0].length;
    let indicesToAddNewColumnsAt : number[] = [];
    // PART 1
    for (let j : number = 0; j < originalNumberOfColumns; j++) {
        let column : string[] = [];
        for (let i : number = 0; i < universeMap.length; i++) {
            column.push(universeMap[i][j]);
        }

        if (!column.includes("#")) {
            // need to add the length of the array to account for how the column will shift
            indicesToAddNewColumnsAt.push(j + indicesToAddNewColumnsAt.length);
        }
    }

    // At this point, we have found the map and know where to expand
    // Now, need to find the points where the galaxies are
    let galaxyCoordinates : number[][] = [];
    // For use in part 2
    let realGalaxyCoordinates : number[][] = [];

    for (let i : number = 0; i < universeMap.length; i++) {
        for (let j : number = 0; j < universeMap[i].length; j++) {
            if (universeMap[i][j] === "#") {
                // Need to do a shift by minus the index, because we applied a shift above to set the index for later
                let numberOfRowExpansions : number = indicesToAddNewRowAt.filter((a : number) => (a - indicesToAddNewRowAt.indexOf(a)) < i).length;
                let numberOfColExpansions : number = indicesToAddNewColumnsAt.filter((a : number) => (a - indicesToAddNewColumnsAt.indexOf(a)) < j).length;
                galaxyCoordinates.push([i + numberOfRowExpansions, j + numberOfColExpansions]);
                // for use in part 2 - for each expansion, add 999999 extra rows / columns
                realGalaxyCoordinates.push([i + (numberOfRowExpansions*999999), j + (numberOfColExpansions * 999999)])
            }
        }
    }


    // Now find the shortest distance between each pair of galaxies
    let totalDistanceBetweenEachPair : number = 0;
    for (let i : number = 0; i < galaxyCoordinates.length; i++) {
        for (let j : number = i + 1; j < galaxyCoordinates.length; j++) {
            // calculate the difference in horizontal and vertical position
            let horizontalDistance : number = Math.abs(galaxyCoordinates[i][1] - galaxyCoordinates[j][1]);
            let verticalDistance : number = Math.abs(galaxyCoordinates[i][0] - galaxyCoordinates[j][0]);
            totalDistanceBetweenEachPair += (horizontalDistance + verticalDistance);
        }
    }

    // PART 2

    let realTotalDistanceBetweenEachPair : number = 0;
    for (let i : number = 0; i < realGalaxyCoordinates.length; i++) {
        for (let j : number = i + 1; j < realGalaxyCoordinates.length; j++) {
            // calculate the difference in horizontal and vertical position
            let horizontalDistance : number = Math.abs(realGalaxyCoordinates[i][1] - realGalaxyCoordinates[j][1]);
            let verticalDistance : number = Math.abs(realGalaxyCoordinates[i][0] - realGalaxyCoordinates[j][0]);
            realTotalDistanceBetweenEachPair += (horizontalDistance + verticalDistance);
        }
    }

    return [totalDistanceBetweenEachPair, realTotalDistanceBetweenEachPair];
}