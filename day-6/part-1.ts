import fs from "fs"; 

type Operator = "+" | "*"


function main() {
  const filename = process.argv.pop()!;
  const lines = fs.readFileSync(filename).toString().split("\n");
  const numberGrid: number[][] = [];
  const operators: Operator[] = [];
  lines.pop();

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i]!;

    let j = 0;
    let numberString = "";
    const numbers: number[] = [];

    while (j < line.length) {
      if (line[j] === " " && numberString !== "") {
        const n = parseInt(numberString);
        numbers.push(n);
        numberString = "";
      }
      if (line[j] !== " ") {
        numberString += line[j]!;
      }
    
      j++;
    }

    const n = parseInt(numberString);
    if (!isNaN(n)) {
      numbers.push(n);
    }

    numberGrid.push(numbers);
  }

  const opsLine = lines.pop()!;
  for (const c of opsLine) {
    if (c === "+") {
      operators.push("+");
    }
    if (c === "*") {
      operators.push("*");
    }
  }


  let grandTotal = 0;
  for (let i = 0; i < numberGrid[0]!.length; i++) {
    const operator = operators[i];
    let total = operator === "*" ? 1 : 0;

    for (let j = 0; j < numberGrid.length; j++) {
      const n = numberGrid[j]![i]!;

      if (operator === "*") {
        total *= n;
      } else {
        total += n;
      }
    }

    grandTotal += total;
  }

  console.log(grandTotal);
}



main();
