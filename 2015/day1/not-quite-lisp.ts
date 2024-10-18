const fs = require('fs');

const data = fs.readFileSync("2015/day1/input.txt", "utf-8");

let up = 0;
let down = 0;
let count = 0;

for (var char of data) {
  count++;

  if (char === '(') up++
  else if (char === ')') { down++ }

  if (up - down < 0) break;
}

console.log('first basement arrival: ', count);
