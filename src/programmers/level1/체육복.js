/**
 *
 * @param {전체 학생 수} n
 * @param {도난당한 학생 배열} lost
 * @param {여벌 체육복 있는 학생 배열} reserve
 * @returns 체육 수업을 들을 수 있는 학생 최댓값
 *
 * - 여벌 체육복 있는 학생이 체육복을 도난당하면 -> 1개만 도난당함
 * (자기만 입고 빌려줄순없는 상태)
 */
function solution(n, lost, reserve) {
  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);

  const realLost = lost.filter((l) => !reserve.includes(l)); // 여분도 없는 도난 학생만.
  const realReserve = reserve.filter((r) => !lost.includes(r)); // 도난당해서 여분으로 못쓰는거제거

  let sad = realLost.length; // 체육 수업 못가는 학생 수

  for (i of realLost) {
    // 여분안가져왔을땐 빌리기 시도
    for (e of [i - 1, i + 1]) {
      index = realReserve.indexOf(e);
      if (index >= 0) {
        sad--;
        realReserve.splice(index, 1); // 여분 체육복 사용
        break;
      }
    }
  }

  return n - sad;
}

const cases = [
  [5, [4, 2], [4, 1, 3], 5],
  [5, [2, 4], [3], 4],
  [3, [3], [1], 2],
  [2, [1, 2], [1, 2], 2],
  [2, [1], [2], 2],
];

const result = cases.every(([n, l, r, a]) => {
  const answer = solution(n, l, r);
  console.log(answer);
  return answer === a;
});
console.log("result: ", result);
