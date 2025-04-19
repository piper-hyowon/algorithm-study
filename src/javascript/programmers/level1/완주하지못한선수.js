function solution(participant, completion) {
  const sortedP = participant.sort().reverse();
  const sortedC = completion.sort().reverse();
  let answer;

  while (true) {
    const p = sortedP.pop(); // shift() 하면 시간초과나서 위에 reverse()추가하고 pop으로 바꿈
    const c = sortedC.pop();
    if (p !== c) {
      answer = p;
      break;
    }
  }

  return answer;
}

const cases = [
  [["leo", "kiki", "eden"], ["eden", "kiki"], "leo"],
  [
    ["marina", "josipa", "nikola", "vinko", "filipa"],
    ["josipa", "filipa", "marina", "nikola"],
    "vinko",
  ],
  [
    ["mislav", "stanko", "mislav", "ana"],
    ["stanko", "ana", "mislav"],
    "mislav",
  ],
];

const result = cases.every(([p, c, r]) => {
  const answer = solution(p, c);
  console.log(answer);
  return answer === r;
});
console.log("result: ", result);

/*
다른 접근법:
1. 인덱스로 직접 비교하는 방법 (shift 대신 O(1) 접근)
2. 무한 루프 대신 for문으로 명확한 종료 조건 사용
3. HashMap(객체)을 사용해 O(n) 시간복잡도로 해결하는 방법
*/
