const fs = require("fs");

const input = fs.readFileSync("day9/input.txt", "utf-8");
let moves = input.split("\r\n");

type Point = {
    x: number;
    y: number;
};

let tailVisits: Point[] = [];
let currHead: Point = { x : 0, y : 0 };
let currTail: Point = { x : 0, y : 0 };
tailVisits.push(currTail);

for (let move of moves.slice(0, 3)) {

    if (!move) { continue; }

    let [direction, steps] = move.split(' ');

    let dir: number[];
    switch(direction) {
        case "U":
            dir = [0,1];
            break;
        case "R":
            dir = [1,0];
            break;
        case "D":
            dir = [0,-1];
            break;
        case "L":
            dir = [-1,0];
            break;
    }

    for (let i = 0; i < steps; i++) {
        const newHead = { x: currHead.x + dir[0], y: currHead.y + dir[1] };
        currHead = newHead;

        let newTail = walkTail(currHead, currTail);
        // check for distinct point before pushing.
        tailVisits.push(newTail);
        currTail = newTail;
        console.log(tailVisits[tailVisits.length-1]);
    }
}

function walkTail(headPoint: Point, tailPoint: Point): Point {

    let head = [headPoint.x, headPoint.y];
    let tail = [tailPoint.x, tailPoint.y];
    // subtract the two points
    let diff = head.map((hVal, hIdx) => hVal - tail[hIdx]);
    console.log(diff);

    if (diff[0] <= 1 && 
        diff[0] >= -1 &&
        diff[1] <= 1 &&
        diff[1] >= -1) {
        return tailPoint;
    }
    else if (diff[0] > 1) {
        // check for diff[1]
    }
    else if (diff[0] < -1) {
        // check for diff[1]
    }
    else if (diff[1] > 1) {
        // check for diff[0]
    }
    else if (diff[1] < -1) {
        // check for diff[0]
    }
}
