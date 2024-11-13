function solution2961() {
  const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((e: string) => e.trim().split(" ").map(Number));

  const N = input[0][0];
  const ingredients = input.slice(1);
  let minimum: number = Infinity;

  //
  // 모든 경우의 수(1~N의 재료를 각각 선택하거나 안하거나)
  const totalCases: number = 1 << N; // 2^N

  // 최소 재료 1 개(i 는 1부터)
  for (let i = 1; i < totalCases; i++) {
    let sour = 1; // 신맛 (곱하기)
    let bitter = 0; // 쓴맛 (더하기)

    for (let j: number = 0; j < N; j++) {
      // j 번째 재료 썼는지 확인
      if (i & (1 << j)) {
        //  1 << j: j번째만 1로 만듬(이진수)
        sour *= ingredients[j][0];
        bitter += ingredients[j][1];
      }
    }
    minimum = Math.min(Math.abs(sour - bitter), minimum);
  }

  console.log(minimum);
}

solution2961();
