import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day07/exampleInput.txt';

const handsRanking : StringKeyNumberValue = {
    "5": 7,
    "41": 6,
    "32": 5,
    "311": 4,
    "221": 3,
    "2111": 2,
    "11111": 1
}

const cardsRanking : StringKeyNumberValue = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2
}

export const daySevenSolution = async () : Promise<number[]> => {
    let camelCardsInterface : readline.Interface = readline.createInterface({
        input : f.createReadStream(inputFile)
    });

    let hands : string[][] = [];
    for await (let hand of camelCardsInterface) {
        let cardsAndBid : string[] = hand.split(" ");
        hands.push(cardsAndBid);
    }

    // PART 1
    let totalWinningsFromAllHands : number = 0;
    for (let hand of hands) {
        let uniqueCardTypes : string = [...hand[0]].reduce((acc, curr) => {
            return acc.includes(curr) ? acc : acc + curr;
        }, "")

        let numberOfCards : StringKeyNumberValue = {};
        let handTypeIdentifier : number[] = [];
        for (let card of uniqueCardTypes) {
           let numberOfCardType : number = [...hand[0]].reduce((acc, curr) => {return curr === card ? acc + curr : acc}, "").length;
           numberOfCards = {...numberOfCards, [card]: numberOfCardType }
           handTypeIdentifier.push(numberOfCardType);
        }
        let stringHandTypeIdentifier : string = handTypeIdentifier.sort((a, b) => b - a).toString().split(",").join("");
        hand.push(handsRanking[stringHandTypeIdentifier].toString());
    }

    hands.sort((a, b) => Number(a[2]) - Number(b[2]));


    for (let handNumber : number = 0; handNumber < hands.length - 1; handNumber++) {
        let currentHand : string[] = hands[handNumber]; 
        
        for (let nextHandNumber : number = 0; nextHandNumber < hands.length - handNumber - 1; nextHandNumber++) {
            let nextHand : string[] = hands[nextHandNumber];
            if (currentHand[2] === nextHand[2]) {
                for (let cardNumber : number = 0; cardNumber < currentHand[0].length; cardNumber++) {
                    let currentHandCurrentCardValue : number = cardsRanking[currentHand[0].charAt(cardNumber)];
                    let nextHandCurrentCardValue : number = cardsRanking[nextHand[0].charAt(cardNumber)];
                    if (currentHandCurrentCardValue < nextHandCurrentCardValue) {
                        break;
                    } else if (currentHandCurrentCardValue === nextHandCurrentCardValue) {
                        continue;
                    } else {
                        hands[handNumber] = nextHand;
                        hands[nextHandNumber] = currentHand;
                        handNumber++;
                        break;
                    }
                }
            }

        }
    }
    console.log(hands)
    for (let i = hands.length - 1; i >= 0; i--) {
        totalWinningsFromAllHands += (Number(hands[i][1]) * (hands.length - i));
    }
    
    // PART 2

    return [totalWinningsFromAllHands, 2];
}

type StringKeyNumberValue = {[key: string] : number}