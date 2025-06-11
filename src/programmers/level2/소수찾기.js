function solution(numbers) {
  const memoryPrimeOrNot = new Map();
  memoryPrimeOrNot.set(0, false);
  memoryPrimeOrNot.set(1, false);
  memoryPrimeOrNot.set(2, true);

  const isPrime = (n) => {
    if (memoryPrimeOrNot.has(n)) return memoryPrimeOrNot.get(n);
    if (n % 2 === 0) {
      memoryPrimeOrNot.set(n, false);
      return false;
    }

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) {
        memoryPrimeOrNot.set(n, false);
        return false;
      }
    }

    memoryPrimeOrNot.set(n, true);
    return true;
  };

  const cases = new Set();
  /**
   *
   * @param {미사용 숫자 배열} arr
   * @param {선택된 숫자 배열} current
   * @returns
   */
  const permute = (arr, current = []) => {
    if (current.length > 0) {
      const num = parseInt(current.join(""));
      if (isPrime(num)) cases.add(num);
    }

    if (arr.length === 0) return;

    for (let i = 0; i < arr.length; i++) {
      // new Arr: 현재 선택한 숫자(arr[i])를 제외한 나머지 숫자들
      const newArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
      permute(newArr, [...current, arr[i]]);
    }
  };
  permute(numbers.split(""));

  return cases.size;
}

const cases = [
  ["17", 3],
  ["011", 2],
];

cases.forEach((e, i) => {
  const r = solution(e[0]);
  console.log(`${i})\t`, r === e[1] ? "정답" : "오답");
});
