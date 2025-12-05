import fs from "fs";

function main() {
  const filename = process.argv.pop()!;

  const lines = fs.readFileSync(filename).toString().split("\n");
  let total = 0;
 
  for (const line of lines) {
    if (line === "") {
      continue;
    }

    let firstDigit = 0;
    let secondDigit = 0;
    let chosenIndex = 0;

    // find the first digit
    for (let i = 0; i < line.length - 1; i++) {
      const digit = parseInt(line[i]!);

      if (digit > firstDigit) {
        firstDigit = digit;
        chosenIndex = i;
      }
    } 

    for (let i = chosenIndex + 1; i < line.length; i++) {
      const digit = parseInt(line[i]!);

      if (digit > secondDigit) {
        secondDigit = digit;
      }
    }

    const joltage = firstDigit * 10 + secondDigit;
    total += joltage;
    console.log(`Got joltage ${joltage}`);
  }

  console.log(total);
}

main();
