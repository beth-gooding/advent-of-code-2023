import { dayOneSolution } from './problems/day01/solution.ts';
import { dayTwoSolution} from './problems/day02/solution.ts';

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