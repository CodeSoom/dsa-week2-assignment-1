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

    const firstItem = this.#items[0];

    for (let index = 1; index < this.#numberOfItems; index += 1) {
      this.#items[index - 1] = this.#items[index];
    }

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

const createNumberArray = (itemCount) => {
  const resultArray = [];

  for (let index = 1; index <= itemCount; index++) {
    resultArray.push(index);
  }

  return resultArray;
};

const solution = (N, M) => {
  const numberOfPersons = N;
  const deathLocation = M;

  const persons = createNumberArray(numberOfPersons);

  const queue = new Queue();
  persons.forEach((person) => queue.enqueue(person));

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
