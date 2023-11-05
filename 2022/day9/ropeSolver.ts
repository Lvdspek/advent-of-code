const fs = require("fs");

const input = fs.readFileSync("day9/input.txt", "utf-8");
let moves = input.split("\r\n");

type Point = {
    x: number;
    y: number;
};

let headVisits: Point[] = [];
let tailVisits: Point[] = [];
let currHead: Point = { x : 0, y : 0 };
let currTail: Point = { x : 0, y : 0 };
tailVisits.push(currTail);

for (let move of moves) {

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
        headVisits.push(newHead);
        console.log("head: ", headVisits[headVisits.length-1]);
        currHead = newHead;

        let newTail = walkTail(currHead, currTail);

        var distinct = tailVisits.findIndex(p => (p.x == newTail.x && p.y === newTail.y));
        if(distinct <= -1){
            tailVisits.push(newTail);
        }        
        currTail = newTail;
        console.log("tail: ", tailVisits[tailVisits.length-1]);
        console.log("Number of tail visits: ", tailVisits.length);
    }
}

function walkTail(headPoint: Point, tailPoint: Point): Point {

    let head = [headPoint.x, headPoint.y];
    let tail = [tailPoint.x, tailPoint.y];
    // subtract the head and tail 
    let diff = head.map((hVal, hIdx) => hVal - tail[hIdx]);

    let newTailPoint : Point = { x: tail[0], y: tail[1] };
    if (diff[0] <= 1 && 
        diff[0] >= -1 &&
        diff[1] <= 1 &&
        diff[1] >= -1) {
        return newTailPoint;
    }

    if (diff[0] > 1) {
        newTailPoint.x++;

        if (diff[1] > 0) {
            newTailPoint.y++;
        }
        else if (diff[1] < 0) {
            newTailPoint.y--;
        }
    }
    else if (diff[0] < -1) {
        newTailPoint.x--;

        if (diff[1] > 0) {
            newTailPoint.y++;
        }
        else if (diff[1] < 0) {
            newTailPoint.y--;
        }
    }
    else if (diff[1] > 1) {
        newTailPoint.y++;

        if (diff[0] > 0) {
            newTailPoint.x++;
        }
        else if (diff[0] < 0) {
            newTailPoint.x--;
        }
    }
    else if (diff[1] < -1) {
        newTailPoint.y--;

        if (diff[0] > 0) {
            newTailPoint.x++;
        }
        else if (diff[0] < 0) {
            newTailPoint.x--;
        }
    }

    return newTailPoint;
}
