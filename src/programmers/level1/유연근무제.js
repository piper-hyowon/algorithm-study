/**
 *
 * @param {직원 n명의 출근 희망 시각 1차원 배열} schedules
 * @param {직원들이 일주일동안 출근한 시각 2차원 배열} timelogs 각 원소는 600~2359
 * @param {이벤트 시작 요일} startday 1월 2화 3수 4목 5금 6토 7일
 * @returns 상품을 받을 직원 수
 */
function solution(schedules, timelogs, startday) {
  var answer = 0;
  const deadlines = [];
  for (const i of schedules) {
    let deadline = i;
    if (i % 100 >= 50) {
      if (i % 1000 >= 900) {
        // 950 -> 1000 , 955 -> 1005
        deadline = 1000 + (i % 10);
      } else {
        // 750 -> 800,  855 -> 905
        deadline = i + 100 - (i % 100) + (i % 10);
      }
    } else {
      deadline += 10;
    }

    deadlines.push(deadline);
    console.log(deadline);
  }

  // 토, 일 인덱스 주기? 구하기
  const isWeekend = (index) => {
    const i = index % 7;
    switch (startday) {
      case 1:
        return [5, 6].includes(i);
      case 2:
        return [4, 5].includes(i);
      case 3:
        return [3, 4].includes(i);
      case 4:
        return [2, 3].includes(i);
      case 5:
        return [1, 2].includes(i);
      case 6:
        return [0, 1].includes(i);
      case 7:
        return [0, 6].includes(i);
    }
  };

  for (let i = 0; i < timelogs.length; i++) {
    let everydayOk = true;
    for (const [j, v] of timelogs[i].entries()) {
      if (!isWeekend(j) && v > deadlines[i]) {
        everydayOk = false;
        break;
      }
    }
    if (everydayOk) {
      answer++;
    }
  }
  return answer;
}

const cases = [
  [
    [730, 855, 700, 720],
    [
      [710, 700, 650, 735, 700, 931, 912],
      [908, 901, 805, 815, 800, 831, 835],
      [705, 701, 702, 705, 710, 710, 711],
      [707, 731, 859, 913, 934, 931, 905],
    ],
    1,
    2,
  ],
  [
    [700, 800, 1100],
    [
      [710, 2359, 1050, 700, 650, 631, 659],
      [800, 801, 805, 800, 759, 810, 809],
      [1105, 1001, 1002, 600, 1059, 1001, 1100],
    ],
    5,
    3,
  ],
];

cases.forEach((e) => {
  const result = solution(e[0], e[1], e[2]);
  console.log("result : ", result);
  console.log(result === e[3] ? "정답" : "오답");
});
