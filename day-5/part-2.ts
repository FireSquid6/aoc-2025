import fs from "fs";


interface FreshRange {
  start: number;
  end: number;
}

function isIn(r: FreshRange, x: number) {
  return (r.start <= x) && (r.end >= x);
}

function amountInRange(r: FreshRange): bigint {
  return BigInt(r.end - r.start + 1);
}


function main() {
  const filename = process.argv.pop()!;
  const lines = fs.readFileSync(filename).toString().split("\n");

  let ranges: FreshRange[] = [];


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


  ranges.sort((a, b) => a.start - b.start);

  i = 0;
  let j = 1;

  while (i < ranges.length - 1) {
    if (ranges[j]!.start <= ranges[i]!.end) {
      if (ranges[i]!.end < ranges[j]!.end) {
        ranges[i]!.end = ranges[j]!.end;
      }
      
      ranges = ranges.filter((_, k) => k !== j);
    } else {
      i++;
      j++;
    }
  }

  console.log(ranges);

  let total = BigInt(0);
  for (const range of ranges) {
    total += amountInRange(range);
  }

  console.log(total);
}

main();
