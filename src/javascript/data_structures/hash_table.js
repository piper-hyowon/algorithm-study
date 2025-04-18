// 1. Object 기반 해시 테이블 (키는 문자열)
const hashTable = {};
hashTable["key1"] = "value";
hashTable["key2"] = "value22";
// console.log(hashTable);
delete hashTable["key1"];
// console.log(hashTable)

// 2. Map 기반 해시 테이블
// Map: 임의의 키 타입 사용, 순서 보장, 크기 추적
/**
 * 일반 객체: 문자열과 Symbol만 키로 사용 가능
 * Map: 함수, 객체, 원시값 등 모든 값을 키로 사용 가능
 *
 * Map: 항목의 삽입 순서가 보장됨
 * 일반 객체: ES2015 이후 보장되지만 일부 특수한 상황에서는 그렇지 않음
 *
 * Map: size 속성으로 쉽게 확인 가능
 * 일반 객체: Object.keys().length 등의 방법 필요
 *
 * Map: 잦은 추가/제거에 최적화됨
 * 일반 객체: 정적인 속성에 더 적합
 */
const map = new Map();
// map["d"] = 3; // Map 의 데이터가 아닌 속성으로 추가(권장X)
map.set("k1", "v1");
map.set(42, "v2");
map.set({ a: 1 }, "v3");
map.delete(42);
map.size;

console.log(map.values);

// 3. WeakMap (키는 객체만 가능, 가비지 컬렉션 허용)
const weakMap = new WeakMap();
let obj1 = {};
let obj2 = {};

weakMap.set(obj1, "value1");
weakMap.set(obj2, "value2");

console.log(weakMap.get(obj1)); // 'value1'
// obj1 = null; // obj1이 가비지 컬렉션 대상이 됨
