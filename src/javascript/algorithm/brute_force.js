// 완전 탐색(브루트 포스)

// 1.1 순열(Permutation) 구현(nPn)
function permutations(arr) {
  // 기본 케이스: 빈 배열이나 요소가 1개인 배열
  if (arr.length <= 1) return [arr];

  const result = [];

  // 각 요소를 첫 번째로 놓고, 나머지 요소들의 순열을 구함
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remainingElements = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const remainingPermutations = permutations(remainingElements);

    for (const perm of remainingPermutations) {
      result.push([current, ...perm]);
    }
  }

  return result;
}

console.log(permutations([1, 2, 3]));
//  [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]

function permutationVisited(arr, r = arr.length) {
  const result = []; // 결과 순열을 저장할 배열
  const visited = new Array(arr.length).fill(false); // 방문 여부 체크
  const current = []; // 현재 만들고 있는 순열

  function dfs() {
    // 순열의 길이가 r에 도달했으면 결과에 추가하고 종료
    if (current.length === r) {
      result.push([...current]); // 깊은 복사를 통해 현재 순열 저장
      return;
    }

    // 모든 요소에 대해 시도
    for (let i = 0; i < arr.length; i++) {
      // 아직 방문하지 않은 요소만 선택
      if (!visited[i]) {
        visited[i] = true; // 현재 요소 방문 표시
        current.push(arr[i]); // 현재 순열에 요소 추가

        // 다음 위치로 이동
        dfs(); // 다음 위치의 요소를 선택하기 위해 재귀 호출

        current.pop(); // 백트래킹: 요소 제거(가장 최근에 추가한 요소 제거)
        visited[i] = false; // 백트래킹: 방문 표시 제거
      }
    }
  }

  dfs();
  return result;
}

// 1.2 조합
function combinations(arr, r) {
  // 요소를 r개 선택하는 모든 조합 찾기
  const result = [];

  function backtrack(start, current) {
    if (current.length === r) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log(combinations([1, 2, 3, 4], 2));
//  [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

// 1.3 부분 집합
function getAllSubsets(arr) {
  const subsets = [[]]; // 공집합으로 시작

  for (const item of arr) {
    // 기존 부분집합에 현재 요소를 추가한 새 부분집합들을 생성
    const newSubsets = subsets.map((subset) => [...subset, item]);
    subsets.push(...newSubsets);
  }

  return subsets;
}

// 사용 예시
console.log(getAllSubsets([1, 2, 3]));
// [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
