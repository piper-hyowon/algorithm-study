function solution() {
  let [[boxCount, bookCount], boxWeights, bookWeights] = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((e: string) => e.trim().split(" ").map(Number));

  let waste: number = 0; // 낭비된 용량
  let boxIndex: number = 0; // 보고있는 박스
  let bookIndex: number = 0; // 들고 있는 책
  while (bookIndex < bookCount || boxIndex < boxCount) {
    // 책은 다 넣었는데 박스가 마지막까지 안 간 경우
    if (bookIndex >= bookCount && boxIndex < boxCount) {
      waste += boxWeights[boxIndex++];
    } else {
      // 현재 책(bookWeights[i])이 현재 박스(boxWeights)에 들어가는지 확인
      if (bookWeights[bookIndex] <= boxWeights[boxIndex]) {
        // 들어가면 넣고(남은 용량 수정) 다음책 준비(책 인덱스++)
        boxWeights[boxIndex] -= bookWeights[bookIndex++];
      } else {
        // 안 들어가면 현재 박스는 봉인하고(현재박스의 잉여용량 체크), 다음 박스를 가져와(박스 인덱스++)
        waste += boxWeights[boxIndex++];
        // 책은 그대로
      }
    }
  }

  console.log(waste); // 정답
}

solution();
