const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const stairCount = input[0];
const stairs = input.slice(1);
let maxScores: number[] = new Array(stairCount); // 각 계단까지의 최대 점수
maxScores[0] = stairs[0]; // 첫 번째 계단 최댓값은 첫 번째 계단 점수
maxScores[1] = Math.max(stairs[0] + stairs[1], stairs[1]); // 첫번째와 두번째를 모두 밟거나, 두번째만 밟거나
maxScores[2] = Math.max(
  stairs[0] + stairs[2], // 첫 계단 + 세 번째 계단
  stairs[1] + stairs[2] // 두 번째 계단 + 세 번째 계단
);

for (let i: number = 3; i < stairCount; i++) {
  maxScores[i] = Math.max(
    maxScores[i - 2] + stairs[i],
    maxScores[i - 3] + stairs[i - 1] + stairs[i]
  );
}

console.log(maxScores[stairCount - 1]);
