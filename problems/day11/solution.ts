import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day11/input.txt';

export const dayElevenSolution = async () : Promise<number[]> => {
    let universeInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let universeMap : string[] = [];
    for await (let line of universeInterface) {
        universeMap.push(line);

        // if this line doesn't have a galaxy, push it again
        if (!line.includes("#")) {
            universeMap.push(line);
        }

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

    // if the column is blank, insert another . into each row using indicesToAddColumnAt
    for (let index of indicesToAddNewColumnsAt) {
        for (let k : number = 0; k < universeMap.length; k++) {
            universeMap[k] = universeMap[k].substring(0, index) + "." + universeMap[k].substring(index);
        }
    }

    // At this point, we have expanded the map
    // Now, need to find the points where the galaxies are
    let galaxyCoordinates : number[][] = [];

    for (let i : number = 0; i < universeMap.length; i++) {
        for (let j : number = 0; j < universeMap[i].length; j++) {
            if (universeMap[i][j] === "#") {
                galaxyCoordinates.push([i, j])
            }
        }
    }

    // Now find the shortest distance between each pair of galaxies
    let totalDistanceBetweenEachPair : number = 0;
    for (let i : number = 0; i < galaxyCoordinates.length; i++) {
        for (let j : number = i + 1; j <galaxyCoordinates.length; j++) {
            // calculate the difference in horizontal and vertical position
            let horizontalDistance : number = Math.abs(galaxyCoordinates[i][1] - galaxyCoordinates[j][1]);
            let verticalDistance : number = Math.abs(galaxyCoordinates[i][0] - galaxyCoordinates[j][0]);
            totalDistanceBetweenEachPair += (horizontalDistance + verticalDistance);
        }
    }

    // PART 2

    return [totalDistanceBetweenEachPair, 2];
}