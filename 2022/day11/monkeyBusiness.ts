const monkeys = new Map();

monkeys.set(0, [61]);
monkeys.set(1, [76, 92, 53, 93, 79, 86, 81]);
monkeys.set(2, [91, 99]);
monkeys.set(3, [58, 67, 66]);
monkeys.set(4, [94, 54, 62, 73]);
monkeys.set(5, [59, 95, 51, 58, 58]);
monkeys.set(6, [87, 69, 92, 56, 91, 93, 88, 73]);
monkeys.set(7, [71, 57, 86, 67, 96, 95]);

let monkeyInspections = [0,0,0,0,0,0,0,0];

for (let rounds = 0; rounds < 20; rounds++) {
    monkeys.forEach((_, monkeyId : number) => {
        doBusiness(monkeyId);
    })
}
console.log(monkeyInspections);


function doBusiness(monkeyId: number) : void {

    let numberOfItems = monkeys.get(monkeyId).length;
    for (let itemIndex = 0; itemIndex < numberOfItems; itemIndex++)
    {
        console.log("items for monkey ", monkeyId, ": ", monkeys.get(monkeyId).length);
        monkeyInspections[monkeyId]++;

        switch (monkeyId) {
            case 0: 
                let item0 = monkeys.get(monkeyId).shift();
                item0 *= 11;
                item0 = Math.floor(item0 / 3);
                if (item0 % 5 === 0) {
                    monkeys.get(7).push(item0);
                }
                else {
                    monkeys.get(4).push(item0);
                }
                
                break;
            case 1: 
                let item1 = monkeys.get(monkeyId).shift();
                item1 += 4;
                item1 = Math.floor(item1 / 3);
                if (item1 % 2 === 0) {
                    monkeys.get(2).push(item1);
                }
                else {
                    monkeys.get(6).push(item1);
                }

                break;
            case 2: 
                let item2 = monkeys.get(monkeyId).shift();
                item2 *= 19;
                item2 = Math.floor(item2 / 3);
                if (item2 % 13 === 0) {
                    monkeys.get(5).push(item2);
                }
                else {
                    monkeys.get(0).push(item2);
                }

                break;
            case 3: 
                let item3 = monkeys.get(monkeyId).shift();
                item3 *= item3;
                item3 = Math.floor(item3 / 3);
                if (item3 % 7 === 0) {
                    monkeys.get(6).push(item3);
                }
                else {
                    monkeys.get(1).push(item3);
                }

                break;
            case 4: 
                let item4 = monkeys.get(monkeyId).shift();
                item4 += 1;
                item4 = Math.floor(item4 / 3);
                if (item4 % 19 === 0) {
                    monkeys.get(3).push(item4);
                }
                else {
                    monkeys.get(7).push(item4);
                }

                break;
            case 5: 
                let item5 = monkeys.get(monkeyId).shift();
                item5 += 3;
                item5 = Math.floor(item5 / 3);
                if (item5 % 11 === 0) {
                    monkeys.get(0).push(item5);
                }
                else {
                    monkeys.get(4).push(item5);
                }

                break;
            case 6: 
                let item6 = monkeys.get(monkeyId).shift();
                item6 += 8;
                item6 = Math.floor(item6 / 3);
                if (item6 % 3 === 0) {
                    monkeys.get(5).push(item6);
                }
                else {
                    monkeys.get(2).push(item6);
                }

                break;
            case 7: 
                let item7 = monkeys.get(monkeyId).shift();
                item7 += 7;
                item7 = Math.floor(item7 / 3);
                if (item7 % 17 === 0) {
                    monkeys.get(3).push(item7);
                }
                else {
                    monkeys.get(1).push(item7);
                }

                break;
        }

        
        monkeys.forEach((items, monkeyId : number) => {
            console.log(`${monkeyId}: ${items}`);
        })
    }
}

