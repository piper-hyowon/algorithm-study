/**
 *
 * @param {찾아야하는 주문 번호} n
 * @param {삭제된 주문들} bans
 * @returns 삭제가 완료된 주문서의 n 번째 주문
 */
function solution(n, bans) {
  bans.sort();

  /**
   * 1글자 주문: 26^1개 - 1 ~ 26
   * 2글자 주문: 26^2 개
   * n글자 주문: 26^n 개
   * ...
   * 11글자 주문: 2^10개
   */
  let bansCopy = [...bans];

  let i = 1; // 글자 수
  let prev = 1;
  let start = 1; // 번호
  let ban = [];
  while (true) {
    prev = start;
    bansCopy = bansCopy.reduce((acc, cur) => {
      if (cur.length !== i) {
        acc.push(cur);
      } else {
        ban.push(cur);
      }
      return acc;
    }, []);

    start += Math.pow(26, i) - ban.length;

    // 찾는 인덱스가 지금 범위에있으면 중단
    if (n >= prev && n <= start) {
      break;
    }

    i++;
  }

  // 찾아야하는 주문(n번째) 은 i 글자,
  // i 글자수안에서 글자 하나씩 고르기
  let answer = "";
  let k = n - prev + 1; // i글자 구간에서 k번째
  let banList = [...ban];

  for (let wordIdx = 0; wordIdx < i; wordIdx++) {
    for (let c = 0; c < 26; c++) {
      const char = String.fromCharCode("a".charCodeAt(0) + c);
      const prefix = answer + char;

      // 남은 자리 수의 모든 조합
      let total = Math.pow(26, i - wordIdx - 1);

      let minus = 0;
      for (const b of banList) {
        if (b.startsWith(prefix)) {
          minus++;
        }
      }
      const count = total - minus;

      if (k <= count) {
        answer += char;
        banList = banList.filter((b) => b.startsWith(prefix));
        break;
      } else {
        k -= count;
      }
    }
  }

  return answer;
}
const cases = [
  [30, ["d", "e", "bb", "aa", "ae"], "ah"],
  [
    7388,
    ["gqk", "kdn", "jxj", "jxi", "fug", "jxg", "ewq", "len", "bhc"],
    "jxk",
  ],
];

cases.forEach((e) => {
  const r = solution(...e);
  console.log(r, r === e.at(-1));
});
