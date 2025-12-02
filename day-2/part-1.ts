import fs from "fs";

function main() {
  const filename = process.argv.pop();
  const text = fs.readFileSync(filename!).toString();

  const ranges = text.split(",").map(r => {
    const [start, end] = r.split("-");

    if (!start || !end) {
      throw new Error(`Range ${r} is not formatted correctly`);
    }

    return {
      start: parseInt(start),
      end: parseInt(end),
    }
  });

  let total = 0;

  for (const range of ranges) {
    for (let i = range.start; i <= range.end; i++) {
      if (!isValid(i)) {
        console.log(`${i} is invalid`);
        total += i;
      }
    }
  }

  console.log(total);
}

export function isValid(n: number): boolean {
  const str = n.toString();
  const middle = Math.ceil(str.length / 2);


  return str.substring(0, middle) !== str.substring(middle, str.length);
}

main();
