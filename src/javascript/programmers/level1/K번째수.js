// commands: [[i, j, k]]
// i번째부터 j까지 자르고, 정렬하고, k번째 수 출력
function solution(array, commands) {
  return commands.map(([i, j, k]) =>
    array
      .slice(i - 1, j)
      .sort((a, b) => a - b)
      .at(k - 1)
  );
}

const cases = [
  {
    input: [
      [1, 5, 2, 6, 3, 7, 4],
      [
        [2, 5, 3],
        [4, 4, 1],
        [1, 7, 3],
      ],
    ],
    output: [5, 6, 3],
  },
];

cases.forEach((e) => {
  const output = solution(e.input[0], e.input[1]);
  console.log(output.every((v, i) => e.output[i] === v));
});
