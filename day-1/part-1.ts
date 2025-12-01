import fs from "fs";


function main() {
  const filename = process.argv.pop()!;
  
  const lines = fs.readFileSync(filename).toString().split("\n");
  let current = 50;
  let count = 0;

  for (const line of lines) {
    if (line === "") {
      continue;
    }
    const direction = line[0];
    const n = parseInt(line.substring(1));

    if (direction === "R") {
      current -= n;
    } else {
      current += n;
    }

    while (current >= 100) {
      current -= 100;
    }
    while (current < 0) {
      current += 100;
    }

    if (current === 0) {
      count += 1;
    }

    console.log(`Rotated ${line} to point at ${current}`);
  }

  console.log(count);
}



main();
