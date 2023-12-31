import * as f from 'fs';
import * as readline from 'node:readline/promises';

const inputFile = './problems/day07/input.txt';

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

const cardsRankingWithJoker : StringKeyNumberValue = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 1,
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

const compareIncludingJoker = (a: string[], b: string[]) : number => {

    if (a[3] && b[3]) {
        return Number(a[3]) - Number(b[3]);
    }

    if (a[3] && !b[3]) {
        return Number(a[3]) - Number(b[2]);
    }

    if (!a[3] && b[3]) {
        return Number(a[2]) - Number(b[3]);
    }

    if (!a[3] && !b[3]) {
        return Number(a[2]) - Number(b[2]);
    }
    return 0;
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

        // For Part 2
        let newRulesNumberOfCards : StringKeyNumberValue = {};
        if (hand[0] === "JJJJJ") {
            hand.push("7");
        }

        if (Object.keys(numberOfCards).includes("J") && hand[0] !== "JJJJJ") {
            let bestUseOfJoker = Object.keys(numberOfCards).filter((s : string) => s !== "J").reduce((a, b) => numberOfCards[a] > numberOfCards[b] ? a : b)
            newRulesNumberOfCards = {...numberOfCards, [bestUseOfJoker]: (numberOfCards[bestUseOfJoker] + numberOfCards["J"])};
            delete newRulesNumberOfCards.J
            let newRulesStringHandTypeIdentifier : string = Object.values(newRulesNumberOfCards).sort((a, b) => b - a).toString().split(",").join("");
            hand.push(String(handsRanking[newRulesStringHandTypeIdentifier]));
        }
    }

    hands.sort((a, b) => Number(a[2]) - Number(b[2]));


    for (let handNumber : number = 0; handNumber < hands.length; handNumber++) {        
        for (let currentHandNumber : number = 0; currentHandNumber < (hands.length - handNumber - 1); currentHandNumber++) {
            let currentHand : string[] = hands[currentHandNumber]; 
            let nextHand : string[] = hands[currentHandNumber + 1];
            if (currentHand[2] === nextHand[2]) {
                for (let cardNumber : number = 0; cardNumber < currentHand[0].length; cardNumber++) {
                    let currentHandCurrentCardValue : number = cardsRanking[currentHand[0].charAt(cardNumber)];
                    let nextHandCurrentCardValue : number = cardsRanking[nextHand[0].charAt(cardNumber)];
                    if (currentHandCurrentCardValue < nextHandCurrentCardValue) {
                        break;
                    } else if (currentHandCurrentCardValue === nextHandCurrentCardValue) {
                        continue;
                    } else {
                        hands[currentHandNumber] = nextHand;
                        hands[currentHandNumber + 1] = currentHand;
                    }
                }
            }

        }
    }

    for (let i = 0; i < hands.length; i++) {
        totalWinningsFromAllHands += (Number(hands[i][1]) * (i + 1));
    }
    
    // PART 2
    let totalWinningsIncludingJokers = 0;
    hands.sort((a, b) => compareIncludingJoker(a, b));
    for (let handNumber : number = 0; handNumber < hands.length; handNumber++) {  
        for (let currentHandNumber : number = 0; currentHandNumber < (hands.length - handNumber - 1); currentHandNumber++) {
            let currentHand : string[] = hands[currentHandNumber]; 
            let nextHand : string[] = hands[currentHandNumber + 1];

            if ((currentHand[3] && nextHand[3] && (currentHand[3] === nextHand[3])) 
                    || (currentHand[3] && !nextHand[3] && (currentHand[3] === nextHand[2]))
                    || (!currentHand[3] && nextHand[3] && (currentHand[2] === nextHand[3]))
                    || (!currentHand[3] && !nextHand[3] && (currentHand[2] === nextHand[2]))) {
                for (let cardNumber : number = 0; cardNumber < currentHand[0].length; cardNumber++) {
                    let currentHandCurrentCardValue : number = cardsRankingWithJoker[currentHand[0].charAt(cardNumber)];
                    let nextHandCurrentCardValue : number = cardsRankingWithJoker[nextHand[0].charAt(cardNumber)];
                    if (currentHandCurrentCardValue < nextHandCurrentCardValue) {
                        break;
                    } else if (currentHandCurrentCardValue === nextHandCurrentCardValue) {
                        continue;
                    } else if (currentHandCurrentCardValue > nextHandCurrentCardValue) {
                        hands[currentHandNumber] = nextHand;
                        hands[currentHandNumber + 1] = currentHand;
                    }
                }
            }

        }
    }
    for (let i = 0; i < hands.length; i++) {
        totalWinningsIncludingJokers += (Number(hands[i][1]) * (i + 1));
    }
    
    return [totalWinningsFromAllHands, totalWinningsIncludingJokers];
}

type StringKeyNumberValue = {[key: string] : number}