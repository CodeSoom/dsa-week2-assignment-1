class LinkedNode {
  item;

  next;

  constructor(item, next) {
    this.item = item;

    if (next) {
      this.next = next;
    }
  }
}

class Queue {
  #first;

  #last;

  #size = 0;

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#size;
  }

  enqueue(item) {
    const node = new LinkedNode(item);

    if (this.isEmpty()) {
      this.#first = node;
      this.#last = node;
    } else {
      const oldLast = this.#last;

      this.#last = node;
      oldLast.next = this.#last;
    }

    this.#size += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('큐가 비어있습니다');
    }

    const { item } = this.#first;

    this.#first = this.#first.next;

    this.#size -= 1;

    if (this.isEmpty()) {
      this.#last = undefined;
    }

    return item;
  }

  [Symbol.iterator]() {
    let current = this.#first;

    return {
      next() {
        if (!current) {
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
