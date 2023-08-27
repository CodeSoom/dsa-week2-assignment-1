/*
[1] API 설계
Queue() - 큐 생성
enqueue(item:any):void - 큐에 아이템 추가
dequeue():item - 큐에서 아이템 출력
isEmpty():Boolean - 큐가 비었는지 확인
size():number - 큐의 사이즈 확인
*/

/*
[2] 큐 그림
[X, A, M, P, L, E]
*/

// [3] 큐 자료구조

class Queue {
  #items;

  #n;

  #capacity;

  constructor(capacity) {
    this.#items = new Array(capacity);
    this.#n = 0;
    this.#capacity = capacity;
  }

  enqueue(item) {
    if (this.isFull()) {
      throw new Error('용량 초과했습니다');
    }
    this.#items[this.#n] = (item);
    // this.#items.push(item); // 가장 나중에 삽입한게 먼저 나온다 에러남 왜?[질문]
    this.#n += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('큐가 비어있습니다');
    }

    this.#n -= 1;

    const result = this.#items[0];
    // n이 증가할 때, 즉 큐의 크기가 증가할 수록 연산 횟수가 같이 증가하여 속도가 느려짐
    for (let i = 0; i < this.#n; i += 1) {
      this.#items[i] = this.#items[i + 1];
    }
    return result;
  }

  isEmpty() {
    return this.#n === 0;
  }

  isFull() {
    return this.#n >= this.#capacity;
  }

  size() {
    return this.#n;
  }

  [Symbol.iterator]() {
    let index = 0;
    const data = [...this.#items];
    return {
      next() {
        return index < data.length
          ? { done: false, value: data[index++] }
          : { done: true };
      },
    };
  }
}

module.exports = Queue;

// [4] 큐 자료구조 - 연결리스트로
class Queue0 {
  #last;

  #first;

  #n;

  constructor() {
    this.#n = 0;
  }

  enqueue(item) {
    const oldFirst = this.#last;
    this.#last = {}; // new Node()
    this.#last.item = item;

    if (this.isEmpty()) {
      this.#first = this.#last;
    } else {
      oldFirst.next = this.#last;
    }

    this.#n += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('큐가 비어있습니다');
    }

    const result = this.#first.item;
    this.#first = this.#first.next;

    if (this.isEmpty()) {
      this.#last = undefined;
    }

    this.#n -= 1;
    return result;
  }

  isEmpty() {
    return this.#n === 0;
  }

  size() {
    return this.#n;
  }

  [Symbol.iterator]() {
    let current = this.#first;

    return {
      next() {
        if (current === undefined) {
          return { done: true };
        }
        const value = current.item;
        current = current.next;
        return { done: false, value };
      },
    };
  }
}

test('큐를 생성하면 비어있다', () => {
  const queue = new Queue();

  expect(queue.isEmpty()).toEqual(true);
});

test('큐에 값을 추가하면 개수가 증가한다', () => {
  const queue = new Queue();

  const oldSize = queue.size();

  queue.enqueue('D');

  const newSize = queue.size();

  expect(newSize - oldSize).toEqual(1);
});

test('큐에서 요소를 제거하면 개수가 감소한다', () => {
  const queue = new Queue();

  queue.enqueue('D');

  const oldSize = queue.size();

  queue.dequeue();

  const newSize = queue.size();

  expect(newSize - oldSize).toEqual(-1);
});

test('가장 먼저에 삽입한게 먼저 나온다', () => {
  const queue = new Queue();

  queue.enqueue('D');
  queue.enqueue('S');
  queue.enqueue('A');

  expect(queue.dequeue()).toBe('D');
  expect(queue.dequeue()).toBe('S');
  expect(queue.dequeue()).toBe('A');
});

test('큐이 비어있는데 dequeue을 하면 예외를 던진다', () => {
  const queue = new Queue();

  queue.enqueue('D');
  queue.enqueue('S');
  queue.enqueue('A');

  queue.dequeue();
  queue.dequeue();
  queue.dequeue();

  expect(() => {
    queue.dequeue();
  }).toThrowError('큐가 비어있습니다');
});

test('큐는 넣은 순서대로 순회한다', () => {
  const data = ['D', 'S', 'A', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];

  const queue = new Queue();

  data.forEach((i) => {
    queue.enqueue(i);
  });

  const output = [];

  for (const item of queue) {
    output.push(item);
  }

  expect(output).toEqual(data);
});
