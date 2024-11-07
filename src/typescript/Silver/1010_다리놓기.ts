const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const T: number = Number(input[0]);
const nms: number[][] = input
  .slice(1)
  .map((e: string) => e.split(" ").map(Number));

const combination = (n: number, r: number): number => {
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= n - i;
    result /= i + 1;
  }
  return result;
};

console.log(nms.map(([n, m]) => combination(m, n)).join("\n"));
