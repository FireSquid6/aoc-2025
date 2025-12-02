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

// slow and inefficient but it's ok
function isValid(n: number): boolean {
  const array = toDigitArray(n);
  const length = array.length;

  for (let w = Math.floor(length / 2); w > 0; w--) {
    if (length % w !== 0) {
      continue;
    }

    const tempArray: number[] = []
    for (let k = 0; k < length / w; k++) {
      for (let i = 0; i < w; i++) {
        tempArray.push(array[i]!);
      }
    }

    if (digitArraysEqual(array, tempArray)) {
      return false;
    }

  }

  return true;
}

function toDigitArray(n: number): number[] {
  const arr: number[] = [];
  
  while (n > 0) {
    const digit = n % 10;
    arr.push(digit);
    n -= digit;
    n /= 10;
  }

  arr.reverse();

  return arr;
}

function digitArraysEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const length = arr1.length;


  for (let i = 0; i < length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}


main();
