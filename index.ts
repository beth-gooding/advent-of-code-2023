import { dayOneProblemOne } from './problems/day01/solution.ts';

await dayOneProblemOne().then((answer) => {
    console.log();
    console.log("Day one puzzle solutions:");
    console.log(`The total sum of calibration values is ${answer[0]}.`);
    console.log(`The true total sum of calibration values is ${answer[1]}.`);
});