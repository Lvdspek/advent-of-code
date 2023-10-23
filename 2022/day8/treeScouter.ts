const fs = require("fs");

const text = fs.readFileSync("day8/input.txt", "utf-8");
let treeRows = text.split("\r\n");

const maxHeight = treeRows.length - 1;
const maxWidth = treeRows[0].length;

treeRows = treeRows.slice(0,maxHeight);

let totalVisibleTrees = 0;

for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < maxWidth; x++) {
        if (isVisible(x, y)) {
            totalVisibleTrees++;
        }
    }
}

console.log(totalVisibleTrees);

function isVisible(x: number, y: number) : boolean {

    if (x === 0 || y === 0 || x === maxWidth-1 || y === maxHeight-1) {
        return true;
    }
    else {
        const treeHeight = treeRows[y][x];
        return (treeHeight > checkUpwards(x,y) || 
                treeHeight > checkDownwards(x,y) ||
                treeHeight > checkLeft(x,y) ||
                treeHeight > checkRight(x,y))
    }
}

function checkUpwards(x: number, y: number) : number {
    
    let heighestTree = 0;

    for (let i = y-1; i >= 0; i--) {
        let treeHeight = treeRows[i][x];
        if (treeHeight > heighestTree) {
            heighestTree = treeHeight;
        }
    }

    return heighestTree;
}
        
function checkDownwards(x: number, y: number) : number {
    
    let heighestTree = 0;

    for (let i = y+1; i < maxHeight; i++) {
        let treeHeight = treeRows[i][x];
        if (treeHeight > heighestTree) {
            heighestTree = treeHeight;
        }
    }

    return heighestTree;
}

function checkLeft(x: number, y: number) : number {
    
    let heighestTree = 0;

    for (let i = x-1; i >= 0; i--) {
        let treeHeight = treeRows[y][i];
        if (treeHeight > heighestTree) {
            heighestTree = treeHeight;
        }
    }

    return heighestTree;
}

function checkRight(x: number, y: number) : number {
    
    let heighestTree = 0;

    for (let i = x+1; i < maxWidth; i++) {
        let treeHeight = treeRows[y][i];
        if (treeHeight > heighestTree) {
            heighestTree = treeHeight;
        }
    }

    return heighestTree;
}
