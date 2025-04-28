/**
 *
 * @param {각 물건 훔칠 때 생기는 흔적 개수, [[A도둑 흔적 수, B도둑 흔적 수]]} info
 * @param {A도둑이 걸리는 누적 흔적 수} n
 * @param {B도둑이 걸리는 누적 흔적 수} m
 * @returns 두 도둑 모두 붙잡히지 않았을 때, A도둑이 남긴 흔적 수 최솟값
 *    만약 두 도둑 모두 붙잡힐수밖에 없다면 -1 return
 */

function solution(info, n, m) {
  const cache = new Map();

  function dfs(index, a, b) {
    // 모든 물건 훔침
    if (index === info.length) {
      return a < n && b < m ? a : Infinity;
    }

    // 이미 경찰에게 잡히는 경우
    if (a >= n || b >= m) {
      return Infinity;
    }

    const key = `${index},${a},${b}`;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const giveToA = dfs(index + 1, a + info[index][0], b);
    const giveToB = dfs(index + 1, a, b + info[index][1]);

    const result = Math.min(giveToA, giveToB);
    cache.set(key, result);
    return result;
  }

  const result = dfs(0, 0, 0);
  return result === Infinity ? -1 : result;
}

// 시간 초과
/**
function solution(info, n, m) {
  // info 를 돌면서 [0], [1] 중 하나 선택. : 모든 경우: 2^물건 수
  let minA = n + m;

  for (let i = 0; i < Math.pow(2, info.length); i++) {
    let a = 0; // 도둑A 흔적수
    let b = 0; // 도둑B 흔적수
    let police = false;

    for (let j = 0; j < info.length; j++) {
      if ((i & (1 << j)) === 0) {
        // 도둑A
        a += info[j][0];
      } else {
        // 도둑B
        b += info[j][1];
      }
      if (a >= n || b >= m) {
        police = true;
        break;
      }
    }

    if (!police && a < n && b < m) {
      minA = Math.min(minA, a);
    }
  }

  return minA === n + m ? -1 : minA;
}
*/
const cases = [
  [
    [
      [1, 2],
      [2, 3],
      [2, 1],
    ],
    4,
    4,
    2,
  ],
  [
    [
      [1, 2],
      [2, 3],
      [2, 1],
    ],
    1,
    7,
    0,
  ],
  [
    [
      [3, 3],
      [3, 3],
    ],
    7,
    1,
    6,
  ],
  [
    [
      [3, 3],
      [3, 3],
    ],
    6,
    1,
    -1,
  ],
];

cases.forEach((e) => {
  const r = solution(...e);
  console.log(r, r === e[3]);
});
