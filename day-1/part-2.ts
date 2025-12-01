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

    for (let i = 0; i < n; i++) {
      if (direction === "R") {
        current -= 1; 
        if (current < 0) {
          current = 99;
        }
      } else {
        current += 1;
        if (current > 99) {
          current = 0;
        }
      }

      if (current === 0) {
        count += 1;
      }
    }


    console.log(`Rotated ${line} to point at ${current}`);
  }

  console.log(count);
}



main();
