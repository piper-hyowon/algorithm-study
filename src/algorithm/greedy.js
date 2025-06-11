function coinChange(coins, amount) {
  coins.sort((a, b) => b - a); // 내림차순 정렬 (큰 동전부터 사용)

  let count = 0;
  let remainingAmount = amount;

  for (const coin of coins) {
    // 현재 동전으로 거슬러 줄 수 있는 최대 개수
    const numCoins = Math.floor(remainingAmount / coin);
    count += numCoins;
    remainingAmount -= numCoins * coin;

    if (remainingAmount === 0) break;
  }

  // 남은 금액이 있다면 거슬러 줄 수 없는 경우
  return remainingAmount === 0 ? count : -1;
}

console.log(coinChange([500, 100, 50, 10], 1260)); // 6 (500원 2개, 100원 2개, 50원 1개, 10원 1개)

function activitySelection(activities) {
  // 종료 시간 기준으로 정렬
  activities.sort((a, b) => a.end - b.end);

  const selected = [activities[0]]; // 첫 번째 활동 선택
  let lastEndTime = activities[0].end;

  for (let i = 1; i < activities.length; i++) {
    // 이전 활동 종료 후 시작하는 활동만 선택
    if (activities[i].start >= lastEndTime) {
      selected.push(activities[i]);
      lastEndTime = activities[i].end;
    }
  }

  return selected;
}

const activities = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 3, end: 4 },
  { start: 5, end: 7 },
  { start: 6, end: 9 },
  { start: 8, end: 10 },
];

console.log(activitySelection(activities));
// [{ start: 1, end: 3 }, { start: 3, end: 4 }, { start: 5, end: 7 }, { start: 8, end: 10 }]
