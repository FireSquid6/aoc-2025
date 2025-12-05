import fs from "fs";

function main() {
  const filename = process.argv.pop()!;

  const lines = fs.readFileSync(filename).toString().split("\n");
  let solution = 0;
 
  for (const line of lines) {
    if (line === "") {
      continue;
    }

    let multiplier = Math.pow(10, 11);
    let startingIndex = -1;
    let totalJoltage = 0;


    for (let i = 11; i >= 0; i--) {
      let joltage = 0;

      for (let j = startingIndex + 1; j < line.length - i; j++) {
        const digit = parseInt(line[j]!);

        if (digit > joltage) {
          joltage = digit;
          startingIndex = j;
        }
      }

      totalJoltage += joltage * multiplier;
      multiplier /= 10;

    }

    solution += totalJoltage;
    console.log(`Joltage is ${totalJoltage} for line ${line}`);
  }

  console.log(solution);
}

main();
