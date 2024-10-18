const fs = require('fs');

const data = fs.readFileSync("2015/day1/input.txt", "utf-8");

let up = 0;
let down = 0;

for (var char of data) {
  if (char === '(') up++
  else if (char === ')') { down++ }
}

console.log('end floor: ', up - down);
