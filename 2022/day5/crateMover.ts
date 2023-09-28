const fs = require('fs');

let crateArrays : string[][] = [];
crateArrays.push(['B','S','V','Z','G','P','W']);
crateArrays.push(['J','V','B','C','Z','F']);
crateArrays.push(['V','L','M','H','N','Z','D','C']);
crateArrays.push(['L','D','M','Z','P','F','J','B']);
crateArrays.push(['V','F','C','G','J','B','Q','H']);
crateArrays.push(['G','F','Q','T','S','L','B']);
crateArrays.push(['L','G','C','Z','V']);
crateArrays.push(['N','L','G']);
crateArrays.push(['J','F','H','C']);

const crateMoves = fs.readFileSync("day5/inputCrateMoves.txt", "utf-8");
const dataSets = crateMoves.split('\r\n');

console.log(crateArrays);
console.log(dataSets.slice(0,3));

for (let move of dataSets) {
    console.log(move);
    if (!move.includes("move")) { break; }
    
    const numberOfCratesToMove = Number(move.split("move ")[1].slice(0,2));
    console.log(numberOfCratesToMove);
    const crateLaneFrom = Number(move.split("from ")[1][0]);
    console.log(crateLaneFrom);
    const crateLaneTo = Number(move.split("to ")[1][0]);
    console.log(crateLaneTo);

    console.log(crateArrays[crateLaneFrom - 1]);
    console.log(crateArrays[crateLaneTo - 1]);

    let cratesToMove : string[] = [];
    for (let i = 0; i < numberOfCratesToMove; i++) {
        const crateToMove = crateArrays[crateLaneFrom - 1].pop();
        console.log(crateToMove);

        if (!crateToMove) {  
            console.log("crateToMove is undefined");
            break;
        }

        cratesToMove.unshift(crateToMove);
    }

    cratesToMove.forEach((c) => crateArrays[crateLaneTo - 1].push(c));
    console.log(crateArrays[crateLaneFrom - 1]);
    console.log(crateArrays[crateLaneTo - 1]);
}

for (let crateLane of crateArrays) {
    console.log(crateLane[crateLane.length - 1]);
    //console.log(crateLane);
}
