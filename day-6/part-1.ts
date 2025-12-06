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
    console.log(`line: ${line}`);

    let j = 0;
    let numberString = "";
    const numbers: number[] = [];

    while (j < line.length - 1) {
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

    numbers.push(parseInt(numberString));

    numberGrid.push(numbers);
  }

  console.log(lines);
  const opsLine = lines.pop()!;
  console.log(`opsLine: ${opsLine}`);
  for (const c of opsLine) {
    if (c === "+") {
      operators.push("+");
    }
    if (c === "*") {
      operators.push("*");
    }
  }

  console.log(numberGrid);
  console.log(operators);

  let grandTotal = 0;
  for (let i = 0; i < numberGrid[0]!.length; i++) {
    const operator = operators[i];
    let total = operator === "*" ? 1 : 0;
    console.log(`Doing operator ${operator} for col ${i}`);

    for (let j = 0; j < numberGrid.length; j++) {
      const n = numberGrid[j]![i]!;
      console.log(`  ${operator}: ${n}`);

      if (operator === "*") {
        total *= n;
      } else {
        total += n;
      }
    }

    grandTotal += total;
    console.log(total);
  }

  console.log(grandTotal);
}



main();
