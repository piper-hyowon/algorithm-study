// 탑다운 방식 (메모이제이션)
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;

  // 이미 계산된 결과가 있으면 재사용
  if (memo[n] !== undefined) return memo[n];

  // 결과 계산 및 저장
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// 바텀업 방식 (테이블링)
function fibonacciDP(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(fibonacci(10)); // 55
console.log(fibonacciDP(10)); // 55

function longestIncreasingSubsequence(arr) {
  if (arr.length === 0) return 0;

  // dp[i]는 arr[i]로 끝나는 LIS의 길이
  const dp = new Array(arr.length).fill(1);

  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

console.log(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])); // 4 (2, 3, 7, 101)

function knapsack(weights, values, capacity) {
  const n = weights.length;
  // dp[i][w]는 처음 i개 아이템과 무게 제한 w로 얻을 수 있는 최대 가치
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // 현재 아이템을 넣을 수 없는 경우
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        // 아이템을 넣는 경우와 넣지 않는 경우 중 최대 가치 선택
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }

  return dp[n][capacity];
}

const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
console.log(knapsack(weights, values, 8)); // 10 (무게 3과 5인 아이템 선택)
