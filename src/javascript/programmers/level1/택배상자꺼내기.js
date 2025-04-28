/**
 *
 * @param {총 상자 수} n
 * @param {가로} w
 * @param {꺼내려는 상자 번호} num
 * @returns {꺼내야하는 상자 수}
 */
function solution(n, w, num) {
  // row 별 숫자 범위! <- num - 1 이 이 안에 속하는지 확인
  // row 0 = 0 ~ w-1 ->  w * row ~ (w * row +1) - 1
  // row 1 = w ~ 2w-1 -> w * row ~ w
  // row 2 = 2w ~ 3w-1
  // 마지막 행 = n-1, n-2, n-3..
  const totalRows = Math.ceil(n / w);
  const topRow = new Array(w).fill(null);

  const remain = n % w === 0 ? w : n % w; // 제일 윗 행 원소 수(나머지)
  if (totalRows % 2 === 1) {
    // 숫자 증가 방향 ->
    for (let i = 0; i < remain; i++) {
      topRow[i] = n - i;
    }
  } else {
    // 숫자 증가 방향 <-
    const offset = w - remain;
    for (let i = 0; i < remain; i++) {
      topRow[offset + i] = n - i;
    }
  }
  console.log("topRow: ", topRow);

  for (let row = 0; row < totalRows; row++) {
    // 범위에 속하는지 확인
    // console.log(`범위: ${w * row} ~ ${w * (row + 1) - 1}`);
    if (num - 1 >= w * row && num - 1 <= w * (row + 1) - 1) {
      // 몇 번째 열인지 구하기
      let col;
      if (row % 2 === 0) {
        col = num - 1 - w * row;
      } else {
        const reverseIdx = num - 1 - w * row;
        col = w - reverseIdx - 1;
      }

      // 제일 윗 행이 채워져있는지 확인
      if (topRow[col] !== null) {
        return totalRows - row;
      } else {
        return totalRows - row - 1;
      }
    }
  }
}

const result1 = solution(22, 6, 8);
const result2 = solution(13, 3, 6);
const result3 = solution(12, 5, 2);
solution(6, 4);

console.log(result1, result2, result3);
