/**
 * 1번부터 ~
 * 수포자1: 1 2 3 4 5
 * 수포자2: 2 1 2 3 2 4 2 5
 * 수포자3: 3 3 1 1 2 2 4 4 5 5
 *
 * @returns 가장 많이 맞힌 사람
 */
function solution(answers) {
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const count = (pattern) =>
    [...answers].reduce((p, c, i) => {
      if (c === pattern[i % pattern.length]) {
        return ++p;
      }
      return p;
    }, 0);

  const scores = patterns.map((e) => count(e));
  const max = Math.max(...scores);
  const answer = [];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= max) {
      answer.push(i + 1);
    }
  }

  return answer;
}

const cases = [
  [[1, 2, 3, 4, 5], [1]],
  [
    [1, 3, 2, 4, 2],
    [1, 2, 3],
  ],
];

cases.every(async (e) => {
  const r = await solution(e[0]);
  console.log("result: ", r);
});
