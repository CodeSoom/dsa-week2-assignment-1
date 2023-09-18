class LinkedNode {
  item;

  next = null;

  constructor(item) {
    this.item = item;
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

    const oldLast = this.#last;

    this.#last = node;

    if (this.isEmpty()) {
      this.#first = node;
    } else {
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

const finalPosition = (queue, M) => {
  if (queue.size() === 1) {
    return queue.dequeue();
  }

  for (let i = 0; i < M - 1; i += 1) {
    queue.enqueue(queue.dequeue());
  }

  queue.dequeue();

  return finalPosition(queue, M);
};

const solution = (N, M) => {
  const queue = new Queue();

  Array.from({ length: N }, (_, i) => i + 1).forEach((number) => {
    queue.enqueue(number);
  });

  return finalPosition(queue, M);
};

test('N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다', () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
