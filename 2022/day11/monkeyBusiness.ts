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

function doBusiness(monkeyId: number) : void {

    for (let itemIndex = 0; itemIndex < monkeys.get(monkeyId).length; itemIndex++)
    {

        monkeyInspections[monkeyId]++;

        switch (monkeyId) {
            case 0: 
                monkeys.get(monkeyId)[itemIndex] *= 11;
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item0 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 5 === 0) {
                    monkeys.get(7).push(item0);
                }
                else {
                    monkeys.get(4).push(item0);
                }
                
                break;
            case 1: 
                monkeys.get(monkeyId)[itemIndex] += 4;
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item1 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 2 === 0) {
                    monkeys.get(2).push(item1);
                }
                else {
                    monkeys.get(6).push(item1);
                }

                break;
            case 2: 
                monkeys.get(monkeyId)[itemIndex] *= 19;
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item2 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 13 === 0) {
                    monkeys.get(5).push(item2);
                }
                else {
                    monkeys.get(0).push(item2);
                }

                break;
            case 3: 
                monkeys.get(monkeyId)[itemIndex] *= monkeys.get(monkeyId)[itemIndex];
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item3 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 7 === 0) {
                    monkeys.get(6).push(item3);
                }
                else {
                    monkeys.get(1).push(item3);
                }

                break;
            case 4: 
                monkeys.get(monkeyId)[itemIndex] += 1; 
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item4 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 19 === 0) {
                    monkeys.get(3).push(item4);
                }
                else {
                    monkeys.get(7).push(item4);
                }

                break;
            case 5: 
                monkeys.get(monkeyId)[itemIndex] += 3; 
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item5 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 11 === 0) {
                    monkeys.get(0).push(item5);
                }
                else {
                    monkeys.get(4).push(item5);
                }

                break;
            case 6: 
                monkeys.get(monkeyId)[itemIndex] += 8; 
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item6 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 3 === 0) {
                    monkeys.get(5).push(item6);
                }
                else {
                    monkeys.get(2).push(item6);
                }

                break;
            case 7: 
                monkeys.get(monkeyId)[itemIndex] += 7; 
                monkeys.get(monkeyId)[itemIndex] = 
                    Math.floor(monkeys.get(monkeyId)[itemIndex] / 3);
                let item7 = monkeys.get(monkeyId).shift();
                if (monkeys.get(monkeyId)[itemIndex] % 17 === 0) {
                    monkeys.get(3).push(item7);
                }
                else {
                    monkeys.get(1).push(item7);
                }

                break;
        }

        
        monkeys.forEach((items, monkeyId : number) => {
            console.log(`${monkeyId}: ${monkeys.get(monkeyId)}`);
        })
    }
}

for (let rounds = 0; rounds < 2; rounds++) {
    monkeys.forEach((items, monkeyId : number) => {
        doBusiness(monkeyId);
    })
}
console.log(monkeyInspections);
