const fs = require('fs');

const data = fs.readFileSync("input.txt", "utf-8");

const dataSets = data.split('\n');
console.log(dataSets.slice(0,3));

const alphabet = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
console.log(alphabet);

let totalScore = 0;
for(let dataSet of dataSets) {
	const dupe = findDupe(dataSet.slice(0, dataSet.length / 2), dataSet.slice(dataSet.length / 2, dataSet.length - 1));
	// console.log(dupe);
	if (dupe === undefined) {
		continue;
		console.log(rankCharacter("Dupe is undefined"));
	}
	let rank = rankCharacter(dupe);
	//console.log(rank);
	if (rank === undefined) {
		console.log(rankCharacter("Rank is undefined"));
		continue;
	}
	totalScore += rank; 
}

console.log(totalScore);

function findDupe(compartment1: string, compartment2: string) : string | undefined {
	for (let char of compartment1) {
		if (compartment2.includes(char)) {
			return char;
		}
	}

	return undefined;
}

function rankCharacter(character: string) : number | undefined{
	if (character.length === 1) {
		return alphabet.indexOf(character) + 1;
	}
	else {
		return undefined;
	}
}
