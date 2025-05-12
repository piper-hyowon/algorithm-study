/**
 *
 * @param {동영상 길이 mm:ss} video_len
 * @param {직전 재생 위치 mm:ss} pos
 * @param {오프닝 시작 시각 mm:ss} op_start
 * @param {오프닝 종료 시각 mm:ss} op_end
 * @param {사용자 입력 배열 (원소는 prev 또는 next)} commands
 * @returns  {최종 동영상 위치 mm:ss}
 * 직전 위치(pos)가 오프닝 구간이면 자동으로 오프닝 종료 시각으로 이동
 */
function solution(video_len, pos, op_start, op_end, commands) {
  const BASE_DATE = new Date(2000, 0, 1);

  const stringToTime = (s) => {
    const t = new Date(BASE_DATE);
    t.setMinutes(...s.split(":").map((e) => Number(e)));
    return t;
  };

  let answer = stringToTime(pos);

  if (pos >= op_start && pos <= op_end) {
    answer = stringToTime(op_end);
  }

  commands.forEach((e) => {
    const newTime = new Date(answer);

    if (e === "prev") {
      newTime.setSeconds(answer.getSeconds() - 10);
      if (newTime.getHours() !== answer.getHours()) {
        answer.setMinutes(0, 0);
      } else {
        answer = newTime;
      }
    } else {
      newTime.setSeconds(answer.getSeconds() + 10);
      const endTime = stringToTime(video_len);
      if (newTime < endTime) {
        answer = newTime;
      } else {
        answer = endTime;
      }
    }

    if (answer >= stringToTime(op_start) && answer <= stringToTime(op_end)) {
      answer = stringToTime(op_end);
    }
  });

  return answer.toISOString().split("T")[1].slice(3, 8);
}

const cases = [
  ["34:33", "13:00", "00:55", "02:55", ["next", "prev"], "13:00"],
  ["10:55", "00:05", "00:15", "06:55", ["prev", "next", "next"], "06:55"],
  ["07:22", "04:05", "00:15", "04:07", ["next"], "04:17"],
  ["30:00", "00:08", "00:00", "00:05", ["prev"], "00:05"],
  ["07:22", "07:05", "00:15", "04:07", ["next", "next"], "07:22"],
  ["07:22", "00:05", "00:15", "04:07", ["next", "next"], "04:17"],
  ["07:22", "00:15", "03:15", "04:07", ["prev", "prev"], "00:00"],
  [
    "34:33",
    "33:55",
    "00:01",
    "34:20",
    ["next", "next", "prev", "prev", "next"],
    "34:30",
  ],
  ["59:59", "59:45", "00:00", "01:00", ["next"], "59:55"],
  ["30:00", "01:05", "01:00", "01:30", ["prev"], "01:30"],
  ["10:55", "00:16", "00:15", "00:17", ["prev"], "00:07"],
  ["10:00", "00:03", "00:00", "00:05", ["prev", "next"], "00:15"],
];

cases.forEach((e) => {
  const result = solution(e[0], e[1], e[2], e[3], e[4]);
  console.log(
    `제출- ${result} 답-${e[5]} ${result === e[5] ? "정답" : "오답"}`
  );
});
