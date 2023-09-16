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
			if (myMove === "X") { // Rock 
				score += 1;
				score += 3;
			} else if (myMove === "Y") { // Paper 
				score += 2;
				score += 6;
			} else if (myMove === "Z") { // Scissors
				score += 3
				score += 0;
			}
			break;
		case "B": // Paper
			if (myMove === "X") { // Rock 
				score += 1;
				score += 0;
			} else if (myMove === "Y") { // Paper 
				score += 2;
				score += 3;
			} else if (myMove === "Z") { // Scissors
				score += 3
				score += 6;
			}
			break;
		case "C": // Scissors
			if (myMove === "X") { // Rock 
				score += 1;
				score += 6;
			} else if (myMove === "Y") { // Paper 
				score += 2;
				score += 0;
			} else if (myMove === "Z") { // Scissors
				score += 3
				score += 3;
			}
			break;

	}

	return score;
}

