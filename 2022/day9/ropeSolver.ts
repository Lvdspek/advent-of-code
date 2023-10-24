const fs = require("fs");

const input = fs.readFileSync("day9/input.txt", "utf-8");
let moves = input.split("\r\n");

type Point = {
    x: number,
    y: number,
}

let map : number[][] = [];

for (let move of moves.slice(0, 10)) {

    if (!move) { continue; }

    let [direction, steps] = move.split(' ');

    for (let i = 0; i < steps; i++) {
        
    }
}
