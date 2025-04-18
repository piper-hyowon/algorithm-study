function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (arr[mid] === target) {
        return mid; // 타겟 발견, 인덱스 반환
      } else if (arr[mid] < target) {
        left = mid + 1; // 오른쪽 절반 탐색
      } else {
        right = mid - 1; // 왼쪽 절반 탐색
      }
    }
    
    return -1; // 타겟이 배열에 없음
  }
  
  const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17];
  console.log(binarySearch(sortedArray, 7)); // 3
  console.log(binarySearch(sortedArray, 6)); // -1

  // 하한값(lower bound): target 이상인 첫 번째 위치 찾기
function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    return left;
  }
  
  // 상한값(upper bound): target보다 큰 첫 번째 위치 찾기
  function upperBound(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      if (arr[mid] <= target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    return left;
  }
  
  const nums = [1, 2, 2, 2, 3, 4, 5];
  console.log(lowerBound(nums, 2)); // 1 (첫 번째 2의 위치)
  console.log(upperBound(nums, 2)); // 4 (마지막 2 다음 위치)