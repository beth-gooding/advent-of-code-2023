import { dayOneSolution } from './problems/day01/solution.ts';
import { dayTwoSolution} from './problems/day02/solution.ts';
import { dayThreeSolution} from './problems/day03/solution.ts';
import { dayFourSolution } from './problems/day04/solution.ts';
import { dayFiveSolution } from './problems/day05/solution.ts';
import { daySixSolution } from './problems/day06/solution.ts';
import { daySevenSolution } from './problems/day07/solution.ts';
import { dayEightSolution } from './problems/day08/solution.ts';
import { dayNineSolution } from './problems/day09/solution.ts';

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
    console.log(`The total number of points on winning scratch cards is ${answer[0]}.`);
    console.log(`The total number of scratch cards is ${answer[1]}.`);
});

await daySixSolution().then((answer) => {
    console.log();
    console.log("Day six puzzle solutions:");
    console.log(`The product of the number of ways to beat the record for each race is ${answer[0]}.`);
    console.log(`The real number of ways to beat the record in the race is ${answer[1]}.`);
});

await daySevenSolution().then((answer) => {
    console.log();
    console.log("Day seven puzzle solutions:");
    console.log(`The total winnings from my set of Camel Cards hands is ${answer[0]}.`);
    console.log(`The total winnings from my set of Camel Cards including jokers is ${answer[1]}.`);
});

await dayEightSolution().then((answer) => {
    console.log();
    console.log("Day eight puzzle solutions:");
    console.log(`The number of moves needed to reach node ZZZ is ${answer[0]}.`);
    console.log(`The number of moves needed in ghost mode to reach all end nodes is ${answer[1]}.`);
});

await dayNineSolution().then((answer) => {
    console.log();
    console.log("Day nine puzzle solutions:");
    console.log(`The total sum of forward extrapolated OASIS values is ${answer[0]}.`);
    console.log(`The total sum of backward extrapolated OASIS values is ${answer[1]}.`);
});

await dayFiveSolution().then((answer) => {
    console.log();
    console.log("Day five puzzle solutions:");
    console.log(`The lowest location number for an initial seed is ${answer[0]}.`);
    console.log(`The answer to part 2 is ${answer[1]}.`);
});