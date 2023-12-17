class Node {
  #item;
  #next;
}

class Queue {
  #first;
  #last;
  #n;

  constructor() {
    this.#n = 0;
  }

  enqueue(item) {
    const oldLast = this.#last;

    this.#last = new Node();
    this.#last.item = item;

    if (this.isEmpty()) {
      this.#first = this.#last;
    } else {
      oldLast.next = this.#last;
    }
    this.#n++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('큐가 비어있습니다');
    }

    const item = this.#first.item;
    this.#first = this.#first.next;

    if (this.isEmpty()) {
      this.#last = undefined;
    }

    this.#n--;

    return item;
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
      next: () => {
        if (current === undefined) {
          return { done: true };
        }

        const value = current.item;
        current = current.next;

        return { value, done: false };
      },
    };
  }
}

const finalPosition = (queue, M) => {
  if (queue.size() === 1) {
    return queue.dequeue();
  }

  for (let i = 0; i < M - 1; i++) {
    queue.enqueue(queue.dequeue());
  }

  queue.dequeue();

  return finalPosition(queue, M);
};

const solution = (N, M) => {
  const queue = new Queue();

  Array.from({ length: N }, (_, i) => i + 1).forEach((i) => queue.enqueue(i));

  return finalPosition(queue, M);
};

test('N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다', () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
