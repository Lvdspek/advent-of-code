const fs = require("fs");

const inputText = fs.readFileSync("day10/input.txt", "utf-8");
let instructions = inputText.split("\r\n");

let registerValue = 1;
let cycles = 0;
let signalStrength = 0;

for(var instruction of instructions) {

    //console.log(instruction);

    if (instruction.startsWith("noop")) {
        increaseCycle();
    }
    else if (instruction.startsWith("addx")) {
        increaseCycle();
        increaseCycle();
        let addValue = Number(instruction.split(' ')[1]);
        //console.log(addValue);
        registerValue = registerValue + addValue;
    }
}

console.log("register X: ", registerValue);
console.log("cycles: ", cycles);
console.log("signal strength: ", signalStrength);

function increaseCycle() {
    cycles++;

    if (cycles === 20 || 
        cycles === 60 ||
        cycles === 100 ||
        cycles === 140 ||
        cycles === 180 ||
        cycles === 220) {
        signalStrength += registerValue * cycles;
    }
}
