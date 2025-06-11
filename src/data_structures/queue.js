// 1. 배열을 이용한 큐 구현
class ArrayQueue {
  constructor() {
    this.items = [];
  }

  // 큐의 뒤에 요소 추가
  enqueue(element) {
    this.items.push(element);
    return element;
  }

  // 큐의 앞에서 요소 제거
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift(); // O(n) 연산 - 모든 요소를 한 칸씩 앞으로 이동
  }

  // 큐의 맨 앞 요소 확인
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  // 큐가 비어있는지 확인
  isEmpty() {
    return this.items.length === 0;
  }

  // 큐의 크기 반환
  size() {
    return this.items.length;
  }

  // 큐 비우기
  clear() {
    this.items = [];
  }

  // 큐 내용 출력
  print() {
    return this.items.toString();
  }
}

// 2. 최적화된 배열 기반 큐 (순환 큐)
class CircularQueue {
  constructor(capacity = 10) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0; // 맨 앞 요소의 인덱스
    this.rear = 0; // 맨 뒤 요소 다음 위치의 인덱스
    this.currentLength = 0; // 현재 요소 수
  }

  // 큐가 가득 찼는지 확인
  isFull() {
    return this.currentLength === this.capacity;
  }

  // 큐가 비어있는지 확인
  isEmpty() {
    return this.currentLength === 0;
  }

  // 큐의 크기 반환
  size() {
    return this.currentLength;
  }

  // 큐에 요소 추가
  enqueue(element) {
    if (this.isFull()) {
      this.resize();
    }

    this.items[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.currentLength++;
    return element;
  }

  // 큐에서 요소 제거
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }

    const item = this.items[this.front];
    this.items[this.front] = null;
    this.front = (this.front + 1) % this.capacity;
    this.currentLength--;
    return item;
  }

  // 큐의 맨 앞 요소 확인
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[this.front];
  }

  // 배열 크기 조정 (큐가 가득 찼을 때)
  resize() {
    const newCapacity = this.capacity * 2;
    const newItems = new Array(newCapacity);

    // 순환 큐의 모든 요소를 새 배열로 복사
    for (let i = 0; i < this.currentLength; i++) {
      newItems[i] = this.items[(this.front + i) % this.capacity];
    }

    this.items = newItems;
    this.front = 0;
    this.rear = this.currentLength;
    this.capacity = newCapacity;
  }

  // 큐 내용 출력
  print() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }

    const values = [];
    for (let i = 0; i < this.currentLength; i++) {
      values.push(this.items[(this.front + i) % this.capacity]);
    }

    return values.join(", ");
  }

  // 큐 비우기
  clear() {
    this.items = new Array(this.capacity);
    this.front = 0;
    this.rear = 0;
    this.currentLength = 0;
  }
}

// 3. 연결 리스트를 이용한 큐 구현
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.front = null; // 큐의 맨 앞 (dequeue 위치)
    this.rear = null; // 큐의 맨 뒤 (enqueue 위치)
    this._size = 0;
  }

  // 큐에 요소 추가 (O(1) 연산)
  enqueue(element) {
    const newNode = new Node(element);

    if (this.isEmpty()) {
      // 큐가 비어있으면 front와 rear가 모두 새 노드를 가리킴
      this.front = newNode;
      this.rear = newNode;
    } else {
      // 큐가 비어있지 않으면 마지막 노드의 다음을 새 노드로 설정하고 rear 갱신
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this._size++;
    return element;
  }

  // 큐에서 요소 제거 (O(1) 연산)
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }

    const removed = this.front;

    if (this.front === this.rear) {
      // 요소가 하나만 있는 경우
      this.front = null;
      this.rear = null;
    } else {
      // 요소가 여러 개 있는 경우
      this.front = this.front.next;
    }

    this._size--;
    return removed.data;
  }

  // 큐의 맨 앞 요소 확인
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.front.data;
  }

  // 큐가 비어있는지 확인
  isEmpty() {
    return this.front === null;
  }

  // 큐의 크기 반환
  size() {
    return this._size;
  }

  // 큐 비우기
  clear() {
    this.front = null;
    this.rear = null;
    this._size = 0;
  }

  // 큐 내용 출력
  print() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }

    let current = this.front;
    const elements = [];

    while (current) {
      elements.push(current.data);
      current = current.next;
    }

    return elements.join(" <- ");
  }
}

// 사용 예제
function testQueues() {
  console.log("===== 배열 기반 큐 테스트 =====");
  const arrayQueue = new ArrayQueue();

  arrayQueue.enqueue(10);
  arrayQueue.enqueue(20);
  arrayQueue.enqueue(30);

  console.log("큐 내용:", arrayQueue.print()); // 10,20,30
  console.log("큐 크기:", arrayQueue.size()); // 3
  console.log("맨 앞 요소:", arrayQueue.front()); // 10

  console.log("dequeue:", arrayQueue.dequeue()); // 10
  console.log("dequeue 후 큐:", arrayQueue.print()); // 20,30

  console.log("\n===== 순환 큐 테스트 =====");
  const circularQueue = new CircularQueue(5);

  circularQueue.enqueue(10);
  circularQueue.enqueue(20);
  circularQueue.enqueue(30);
  circularQueue.enqueue(40);
  circularQueue.enqueue(50);

  console.log("큐가 가득 찼나요?", circularQueue.isFull()); // true
  console.log("큐 내용:", circularQueue.print()); // 10, 20, 30, 40, 50

  console.log("dequeue:", circularQueue.dequeue()); // 10
  console.log("dequeue:", circularQueue.dequeue()); // 20

  // 순환 특성 테스트
  circularQueue.enqueue(60);
  circularQueue.enqueue(70);

  console.log("순환 후 큐 내용:", circularQueue.print()); // 30, 40, 50, 60, 70

  console.log("\n===== 연결 리스트 기반 큐 테스트 =====");
  const linkedQueue = new LinkedListQueue();

  linkedQueue.enqueue(10);
  linkedQueue.enqueue(20);
  linkedQueue.enqueue(30);

  console.log("큐 내용:", linkedQueue.print()); // 10 <- 20 <- 30
  console.log("큐 크기:", linkedQueue.size()); // 3
  console.log("맨 앞 요소:", linkedQueue.peek()); // 10

  console.log("dequeue:", linkedQueue.dequeue()); // 10
  console.log("dequeue 후 큐:", linkedQueue.print()); // 20 <- 30

  // 큐 성능 비교
  const OPERATIONS = 100000;
  console.log(`\n===== 큐 성능 비교 (${OPERATIONS}개 요소) =====`);

  // 배열 큐 성능 테스트 (shift 연산으로 인해 느림)
  const arrayQueuePerf = new ArrayQueue();
  console.time("ArrayQueue");
  for (let i = 0; i < OPERATIONS; i++) {
    arrayQueuePerf.enqueue(i);
  }
  for (let i = 0; i < OPERATIONS; i++) {
    arrayQueuePerf.dequeue();
  }
  console.timeEnd("ArrayQueue");

  // 순환 큐 성능 테스트
  const circularQueuePerf = new CircularQueue(OPERATIONS);
  console.time("CircularQueue");
  for (let i = 0; i < OPERATIONS; i++) {
    circularQueuePerf.enqueue(i);
  }
  for (let i = 0; i < OPERATIONS; i++) {
    circularQueuePerf.dequeue();
  }
  console.timeEnd("CircularQueue");

  // 연결 리스트 큐 성능 테스트
  const linkedQueuePerf = new LinkedListQueue();
  console.time("LinkedListQueue");
  for (let i = 0; i < OPERATIONS; i++) {
    linkedQueuePerf.enqueue(i);
  }
  for (let i = 0; i < OPERATIONS; i++) {
    linkedQueuePerf.dequeue();
  }
  console.timeEnd("LinkedListQueue");

  return "테스트 완료";
}

// 테스트 함수 실행
console.log(testQueues());
