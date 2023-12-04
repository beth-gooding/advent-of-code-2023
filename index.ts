import { dayOneSolution } from './problems/day01/solution.ts';
import { dayTwoSolution} from './problems/day02/solution.ts';
import { dayThreeSolution} from './problems/day03/solution.ts';
import { dayFourSolution } from './problems/day04/solution.ts';

await dayOneSolution().then((answer) => {
    console.log();
    console.log("Day one puzzle solutions:");
    console.log(`The total sum of calibration values is ${answer[0]}.`);
    console.log(`The true total sum of calibration values is ${answer[1]}.`);
});

await dayTwoSolution().then((answer) => {
    console.log();
    console.log("Day two puzzle solutions:");
    console.log(`The total sum of game ids for possible games is ${answer[0]}.`);
    console.log(`The total sum of powers for each game is ${answer[1]}.`);
});

await dayThreeSolution().then((answer) => {
    console.log();
    console.log("Day three puzzle solutions:");
    console.log(`The sum of all engine part numbers in the engine schematic is ${answer[0]}.`);
    console.log(`The sum of all gear ratios is ${answer[1]}.`);
});

await dayFourSolution().then((answer) => {
    console.log();
    console.log("Day four puzzle solutions:");
    console.log(`The answer to part 1 is ${answer[0]}.`);
    console.log(`The answer to part 2 is ${answer[1]}.`);
});