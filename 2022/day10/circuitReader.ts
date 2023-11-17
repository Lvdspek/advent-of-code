const fs = require("fs");

const inputText = fs.readFileSync("day10/input.txt", "utf-8");
let instructions = inputText.split("\r\n");

let registerValue = 1;
let cycles = 0;
let crt: string[] = ["","","","","",""];
let crtIndex = 0;

for(var instruction of instructions) {

    if (instruction.startsWith("noop")) {
        increaseCycle();
    }
    else if (instruction.startsWith("addx")) {
        increaseCycle();
        increaseCycle();
        let addValue = Number(instruction.split(' ')[1]);
        registerValue = registerValue + addValue;
    }
}

function increaseCycle() {

    if (cycles !== 0 && cycles % 40 === 0) {
        crtIndex++;
    }

    if (registerValue === (cycles - 40 * crtIndex) ||
        registerValue === (cycles - 40 * crtIndex) + 1 ||
        registerValue === (cycles - 40 * crtIndex) - 1) {

        crt[crtIndex] += "#";
    }
    else {
        crt[crtIndex] += ".";
    }

    cycles++;

    if (cycles % 40 === 0) {
        console.log(crt[crtIndex]);
    }
}
