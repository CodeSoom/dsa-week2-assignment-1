class Queue {
  #capacity;

  #numberOfItems;

  #items;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#numberOfItems = 0;
    this.#items = new Array(capacity);
  }

  enqueue(item) {
    if (this.isFull()) {
      throw new Error('용량이 꽉 찼습니다.');
    }

    this.#items[this.#numberOfItems] = item;
    this.#numberOfItems += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('큐가 비어있습니다');
    }

    // First In, First Out = FIFO
    const firstItem = this.#items[0];

    // todo : 남은 item 들을 각각 앞으로 옮겨야 한다.
    for (let index = 1; index < this.#numberOfItems; index += 1) {
      this.#items[index - 1] = this.#items[index];
    }

    // item 을 하나 꺼냈으므로 아이템 수 - 1
    this.#numberOfItems -= 1;

    return firstItem;
  }

  isEmpty() {
    return this.#numberOfItems === 0;
  }

  size() {
    return this.#numberOfItems;
  }

  isFull() {
    return this.#numberOfItems === this.#capacity;
  }

  [Symbol.iterator]() {
    let index = 0;
    const items = this.#items;
    const numberOfItems = this.#numberOfItems;

    return {
      next() {
        return index < numberOfItems
          ? { done: false, value: items[index++] }
          : { done: true };
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

test('가장 나중에 삽입한게 먼저 나온다', () => {
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
