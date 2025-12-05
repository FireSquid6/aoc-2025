import fs from "fs";


interface FreshRange {
  start: number;
  end: number;
}

function isIn(r: FreshRange, x: number) {
  return (r.start <= x) && (r.end >= x);
}


function main() {
  const filename = process.argv.pop()!;
  const lines = fs.readFileSync(filename).toString().split("\n");

  const ranges: FreshRange[] = [];


  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;

    if (line === "") {
      break;
    }

    const split =line.split("-")
    const s = parseInt(split[0]!);
    const e = parseInt(split[1]!);

    ranges.push({
      start: s,
      end: e,
    });

    i++;
  }

  let count = 0;

  while (i < lines.length) {
    const n = parseInt(lines[i]!);

    for (const range of ranges) {
      if (isIn(range, n)) {
        count += 1;
        break;
      }
    }

    i++;
  }

  console.log(count);
}

main();
