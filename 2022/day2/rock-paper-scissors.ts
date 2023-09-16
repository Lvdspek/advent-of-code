const fs = require('fs');

const data = fs.readFileSync("input.txt", "utf-8");

const dataSets = data.split('\n');
console.log(dataSets[0]);
let totalScore = 0;
for (let i = 0; i < dataSets.length; i++) {
	totalScore += determineScore(dataSets[i][0], dataSets[i][2]);
}

console.log(totalScore);

function determineScore(opponentMove : string, myMove: string) : number {

	let score = 0;

	switch(opponentMove)
	{
		case "A": // Rock
			if (myMove === "X") { // Lose: Scissors 
				score += 3;
				score += 0;
			} else if (myMove === "Y") { // Draw: Rock 
				score += 1;
				score += 3;
			} else if (myMove === "Z") { // Win: Paper 
				score += 2;
				score += 6;
			}
			break;
		case "B": // Paper
			if (myMove === "X") { // Lose: Rock
				score += 1;
				score += 0;
			} else if (myMove === "Y") { // Draw: Paper
				score += 2;
				score += 3;
			} else if (myMove === "Z") { // Win: Scissors
				score += 3;
				score += 6;
			}
			break;
		case "C": // Scissors
			if (myMove === "X") { // Lose: Paper
				score += 2;
				score += 0;
			} else if (myMove === "Y") { // Draw: Scissors
				score += 3;
				score += 3;
			} else if (myMove === "Z") { // Win: Rock
				score += 1;
				score += 6;
			}
			break;

	}

	return score;
}

