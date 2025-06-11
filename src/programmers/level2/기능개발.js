/**
 *
 * @param {작업 진도 배열(배포된어야하는 순서대로)} progresses
 * @param {각 개발 속도 배열} speeds
 * @returns 각 배포마다 몇 개의 기능이 배포되는지
 *
 * 배포는 하루에 한 번만 가능
 */
function solution(progresses, speeds) {
  const goal = progresses.length;
  const done = [];
  let doneCount = 0;

  const inProgress = [...progresses];

  while (doneCount < goal) {
    for (let i = 0; i < inProgress.length; i++) {
      if (inProgress[i] < 100) {
        inProgress[i] += speeds[i];
      }
    }

    let doneToday = 0;

    while (inProgress.length > 0 && inProgress[0] >= 100) {
      inProgress.shift();
      speeds.shift();
      doneToday++;
      doneCount++;
    }

    if (doneToday > 0) {
      done.push(doneToday);
    }
  }

  return done;
}

const cases = [
  [
    [93, 30, 55],
    [1, 30, 5],
    [2, 1],
  ],
    [
      [95, 90, 99, 99, 80, 99],
      [1, 1, 1, 1, 1, 1],
      [1, 3, 2],
    ],
];

cases.forEach((e) => {
  const r = solution(e[0], e[1]);
  console.log(r);
});
