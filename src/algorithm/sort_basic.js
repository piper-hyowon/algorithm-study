// 기본 정렬 (문자열 기준)
const fruits = ["banana", "apple", "orange", "grape"];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'grape', 'orange']

// 숫자 정렬 - 오름차순
const numbers = [10, 5, 8, 1, 7];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 5, 7, 8, 10]

// 숫자 정렬 - 내림차순
numbers.sort((a, b) => b - a);
console.log(numbers); // [10, 8, 7, 5, 1]

// 객체 배열 정렬
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 },
];

// 나이 기준 정렬
people.sort((a, b) => a.age - b.age);
console.log(people); // 나이 오름차순으로 정렬된 배열

// 이름 기준 정렬
people.sort((a, b) => a.name.localeCompare(b.name));
console.log(people); // 이름 알파벳 순으로 정렬된 배열
