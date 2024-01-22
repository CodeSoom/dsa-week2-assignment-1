class Node {
  item;

  next;
}

class Queue {
  #first;

  #last;

  #numberOfItems;

  constructor() {
    this.#numberOfItems = 0;
  }

  isEmpty() {
    return this.#numberOfItems === 0;
  }

  size() {
    return this.#numberOfItems;
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

    this.#numberOfItems += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('큐가 비어있습니다');
    }

    const firstItem = this.#first.item;
    this.#first = this.#first.next;

    this.#numberOfItems -= 1;

    return firstItem;
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

const createNumberArray = (itemCount) => {
  const resultArray = [];

  for (let index = 1; index <= itemCount; index++) {
    resultArray.push(index);
  }

  return resultArray;
};

const solution = (numberOfPersons, deathLocation) => {
  const persons = createNumberArray(numberOfPersons);

  const queue = new Queue();
  persons.forEach((person) => {
    queue.enqueue(person);
  });

  while (queue.size() > 1) {
    for (let index = 0; index < deathLocation - 1; index += 1) {
      const personToMove = queue.dequeue();
      queue.enqueue(personToMove);
    }

    queue.dequeue();
  }

  return queue.dequeue();
};

test('N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다', () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
