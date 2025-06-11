// 1. 배열을 이용한 구현
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }

  peek() {
    return this.items.at(-1);
  }

  isEmpty() {
    return !!!this.items.length;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

// 2. 연결리스트로 구현
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListStack {
  constructor() {
    this.top = null;
    this._size = 0;
  }

  // 요소 추가 (O(1) 시간 복잡도)
  push(element) {
    const newNode = new Node(element);

    if (!this.top) {
      this.top = newNode;
    } else {
      // 새 노드를 스택의 맨 위에 추가
      newNode.next = this.top;
      this.top = newNode;
    }

    this._size++;
    return element;
  }

  // 요소 제거 (O(1) 시간 복잡도)
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }

    const removedNode = this.top;
    this.top = this.top.next;
    this._size--;

    return removedNode.data;
  }

  // 맨 위 요소 확인 (O(1) 시간 복잡도)
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.top.data;
  }

  // 스택이 비어 있는지 확인
  isEmpty() {
    return this.top === null;
  }

  // 스택 크기 반환
  size() {
    return this._size;
  }

  // 스택 비우기
  clear() {
    this.top = null;
    this._size = 0;
  }

  // 스택 내용 출력 (디버깅 및 시각화 목적)
  print() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }

    let current = this.top;
    const elements = [];

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    return elements.join(" -> ");
  }

  // 모든 요소 배열로 반환
  toArray() {
    const array = [];
    let current = this.top;

    while (current) {
      array.push(current.data);
      current = current.next;
    }

    return array;
  }
}

// 사용 예제
function testLinkedListStack() {
  const stack = new LinkedListStack();

  console.log("스택이 비어 있나요?", stack.isEmpty()); // true

  // 요소 추가
  stack.push(10);
  stack.push(20);
  stack.push(30);

  console.log("스택 내용:", stack.print()); // "30 -> 20 -> 10"
  console.log("스택 크기:", stack.size()); // 3
  console.log("맨 위 요소:", stack.peek()); // 30

  // 요소 제거
  console.log("제거된 요소:", stack.pop()); // 30
  console.log("제거 후 스택 내용:", stack.print()); // "20 -> 10"

  // 스택 비우기
  stack.clear();
  console.log("비운 후 스택 상태:", stack.isEmpty()); // true

  return "테스트 완료";
}

// 테스트 실행
console.log(testLinkedListStack());
