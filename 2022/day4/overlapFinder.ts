const fs = require('fs');

const data = fs.readFileSync("day4/input.txt", "utf-8");

const dataSets = data.split('\r\n');
//console.log(dataSets.slice(0,3));

const range = (start : number, end : number, step : number) : number[] => {
  return Array.from(Array.from(Array(Math.ceil((end-start)/step)).keys()), x => start+ x*step);
}

const checker = (arr : any[], target: any[]) => { return target.every(v => arr.includes(v)); }

let overlaps = 0;

for (let dataSet of dataSets) {
	var pair = dataSet.split(',');
	var sectionAssignments = [];
	let endCheck = false;	
	for (let i = 0; i < pair.length; i++) {
		const startAndEnd = pair[i].split('-');	
		if (startAndEnd.length === 1) {
			endCheck = true;
			break;
		}

		sectionAssignments.push(range(+startAndEnd[0], +startAndEnd[1]+1, 1));
	}
	
	if (endCheck) { break; }

	if (checker(sectionAssignments[0], sectionAssignments[1]) || checker(sectionAssignments[1], sectionAssignments[0])) {
		overlaps++;
	}
}

console.log(overlaps);
