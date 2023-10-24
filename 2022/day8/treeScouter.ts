const fs = require("fs");

const text = fs.readFileSync("day8/input.txt", "utf-8");
let treeRows = text.split("\r\n");

const maxHeight = treeRows.length - 1;
const maxWidth = treeRows[0].length;

treeRows = treeRows.slice(0,maxHeight);

let bestScenicScore = 0;

for (let y = 0; y < maxHeight; y++) {
    for (let x = 0; x < maxWidth; x++) {
        let scenicScore = 0;
        scenicScore = checkUpwards(x,y);
        scenicScore *= checkDownwards(x,y);
        scenicScore *= checkLeft(x,y);
        scenicScore *= checkRight(x,y);
        if (bestScenicScore < scenicScore) {
            bestScenicScore = scenicScore;
        }
    }
}

console.log(bestScenicScore);

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
    
    let treesInSight = 0;
    let currentTreeHeight = treeRows[y][x];

    for (let i = y-1; i >= 0; i--) {
        let treeHeight = treeRows[i][x];
        treesInSight++; 

        if (treeHeight >= currentTreeHeight) {
            return treesInSight;
        }
    }

    return treesInSight;
}
        
function checkDownwards(x: number, y: number) : number {
    
    let treesInSight = 0;
    let currentTreeHeight = treeRows[y][x];

    for (let i = y+1; i < maxHeight; i++) {
        let treeHeight = treeRows[i][x];
        treesInSight++; 

        if (treeHeight >= currentTreeHeight) {
            return treesInSight;
        }
    }

    return treesInSight;
}

function checkLeft(x: number, y: number) : number {
    
    let treesInSight = 0;
    let currentTreeHeight = treeRows[y][x];

    for (let i = x-1; i >= 0; i--) {
        let treeHeight = treeRows[y][i];
        treesInSight++; 

        if (treeHeight >= currentTreeHeight) {
            return treesInSight;
        }
    }

    return treesInSight;
}

function checkRight(x: number, y: number) : number {

    let treesInSight = 0;
    let currentTreeHeight = treeRows[y][x];

    for (let i = x+1; i < maxWidth; i++) {
        let treeHeight = treeRows[y][i];
        treesInSight++; 

        if (treeHeight >= currentTreeHeight) {
            return treesInSight;
        }
    }

    return treesInSight;
}
