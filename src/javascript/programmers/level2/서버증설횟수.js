/**
 *
 * @param {시간대별 게임 이용자수, 1차원 배열} players
 * @param {서버 한 대가 감당가능한 최대 이용자 수} m
 * @param {서버 한 대가 운영 가능한 시간} k
 * @returns 최소 서버 증설 횟수
 */
function solution(players, m, k) {
  let count = 0;
  const currentServer = new Array(24).fill(1);

  for (let i = 0; i < 24; i++) {
    // console.log(`${i}~ ${i + 1}시: 서버 수 ${currentServer[i]}`);
    if (players[i] >= currentServer[i] * m) {
      //   console.log(`${players[i]}명`);
      const n = Math.ceil((players[i] + 1 - currentServer[i] * m) / m);
      count += n;
      //   console.log("늘려야하는 서버 수 : ", n);
      for (let j = 0; j < k && i + j < 24; j++) {
        currentServer[i + j] += n;
      }
    }
  }

  return count;
}

const cases = [
  [
    [0, 2, 3, 3, 1, 2, 0, 0, 0, 0, 4, 2, 0, 6, 0, 4, 2, 13, 3, 5, 10, 0, 1, 5],
    3,
    5,
    7,
  ],
  [
    [
      0, 0, 0, 10, 0, 12, 0, 15, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 11, 0, 8, 0, 0,
      0,
    ],
    5,
    1,
    11,
  ],
  [
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    1,
    1,
    12,
  ],
];

cases.forEach((e) => {
  const result = solution(e[0], e[1], e[2]);

  console.log(result, result === e[3]);
});
