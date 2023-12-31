const fs = require('fs');

const signal = fs.readFileSync("day6/input.txt", "utf-8");

let result : number = -1;

const identifierSize = 14;
for (let charIndex = 0; charIndex < signal.length; charIndex++) {
    if (charIndex < identifierSize) {
        continue;
    }

    const subset = signal.slice(charIndex - identifierSize, charIndex);
//    console.log(subset);
    let areAllInSubsetUnique = true;

    for (let char of subset) {
 //       console.log("char: " + char + "  ," + subset.split(char).length);
        if (subset.split(char).length > 2) {
            areAllInSubsetUnique = false;
            break;
        }
    }
    
    if (areAllInSubsetUnique) {
    console.log("subset: " + subset + ", new char: " + signal[charIndex] +
               ", charIndex: " + charIndex);
        result = charIndex;
        break;
    }
}

console.log(result);
