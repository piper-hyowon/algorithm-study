// 배열(Array)
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(5);

arr.push(6);
arr.pop();
arr.unshift(0);
arr.shift();
arr.splice(4, 1);
arr.indexOf(100);

// console.log(arr);

// 단일 연결 리스트(Singly Linked List)
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(v) {
    const newNode = new Node(v);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    let current = this.head;
    let newTail;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  shift() {
    if (!this.head) return undefined;

    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return currentHead;
  }

  unshift(v) {
    const newNode = new Node(v);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  get(i) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter != index) {
      current = current.next;
      counter++;
    }

    return current;
  }

  set(i, v) {
    const foundNode = this.get(i);
    if (foundNode) {
      foundNode.value = v;
      return true;
    }
    return false;
  }

  insert(i, v) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(v);
    if (index === 0) return !!this.unshift(v);

    const newNode = newNode(val);
    const prev = this.get(i - 1);
    const temp = prev.next;

    prev.next = newNode;
    newNode.next = temp;
    this.length++;

    return true;
  }

  remove(i) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return !!this.shift();
    if (index === this.length - 1) return !!this.pop();

    const previousNode = this.get(index - 1);
    const removed = previousNode.next;

    previousNode.next = removed.next;
    this.length--;

    return removed;
  }

  reverse() {
    // "각 노드의 포인터 방향을 반대로 바꿈"
    let currentNode = this.head; // 현재 작업 중인 노드 (처음에는 첫 노드)
    this.head = this.tail; // 헤드와 테일 교환 (1단계)
    this.tail = currentNode; // 헤드와 테일 교환 (2단계)

    let nextNodeToProcess; // 다음에 처리할 노드
    let previousProcessedNode = null; // 이미 처리한 이전 노드

    for (let i = 0; i < this.length; i++) {
      // 현재 노드의 원래 다음 노드를 임시 저장
      nextNodeToProcess = currentNode.next;

      // 포인터 방향 뒤집기: 현재 노드가 이전 노드를 가리키게 함
      currentNode.next = previousProcessedNode;

      // 다음 반복을 위한 준비
      previousProcessedNode = currentNode; // 현재 노드는 이제 "처리됨"
      currentNode = nextNodeToProcess; // 다음 노드로 이동
    }

    return this;
  }
}

/**
1→2→3 
초기 상태:

currentNode = 1 (head)
head = 3 (원래 tail)
tail = 1 (원래 head)
previousProcessedNode = null
nextNodeToProcess = undefined

루프 1회차 (i=0):

nextNodeToProcess = 2 (현재 노드 1의 다음 노드)
currentNode.next = null (1의 포인터를 null로 변경: 1→null)
previousProcessedNode = 1 (현재 노드가 이전 노드가 됨)
currentNode = 2 (다음 노드로 이동)

루프 2회차 (i=1):

nextNodeToProcess = 3 (현재 노드 2의 다음 노드)
currentNode.next = 1 (2의 포인터를 1로 변경: 2→1→null)
previousProcessedNode = 2 (현재 노드가 이전 노드가 됨)
currentNode = 3 (다음 노드로 이동)

루프 3회차 (i=2):

nextNodeToProcess = null (현재 노드 3의 다음 노드는 없음)
currentNode.next = 2 (3의 포인터를 2로 변경: 3→2→1→null)
previousProcessedNode = 3 (현재 노드가 이전 노드가 됨)
currentNode = null (더 이상 처리할 노드 없음)

최종 결과: 3→2→1→null

 */
const list = new SinglyLinkedList();
console.log(list);

list.push(4);
list.push(100);
list.push('final')
list.pop()
console.log(list);
