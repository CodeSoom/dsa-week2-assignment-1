class Node {
  #item;

  #next;
}

class Bag {
  #first;

  #numberOfItems;

  constructor() {
    this.#numberOfItems = 0;
  }

  size() {
    return this.#numberOfItems;
  }

  isEmpty() {
    return this.#numberOfItems === 0;
  }

  add(item) {
    const oldFirst = this.#first;

    this.#first = new Node();
    this.#first.item = item;
    this.#first.next = oldFirst;

    this.#numberOfItems += 1;
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

test('백은 비어있는 상태로 생성된다', () => {
  const bag = new Bag();

  expect(bag.isEmpty()).toBe(true);
});

test('백에 값을 추가하면, 개수가 증가한다', () => {
  const bag = new Bag();

  const oldSize = bag.size();

  bag.add('D');

  const newSize = bag.size();

  expect(newSize - oldSize).toBe(1);
});

test('백의 모든 요소를 순회할 수 있다', () => {
  const bag = new Bag();

  [1, 3, 5, 7, 9].forEach((i) => {
    bag.add(i);
  });

  let sum = 0;

  for (const item of bag) {
    sum += item;
  }

  expect(sum).toBe(25);
});
