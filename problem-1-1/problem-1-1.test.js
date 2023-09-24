/* eslint-disable no-unused-vars */
/* eslint-disable lines-between-class-members */
/* eslint-disable quotes */
class Bag1 {
  #items;
  #n;

  constructor(size = 10) {
    this.#items = new Array(size);
    this.#n = 0;
  }

  add(item) {
    this.#items[this.#n] = item;
    this.#n++;
  }

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.#n === 0;
  }

  [Symbol.iterator]() {
    let index = 0;
    const n = this.#n;
    const data = this.#items;

    return {
      next() {
        return index < n
          ? { done: false, value: data[index++] }
          : { done: true };
      },
    };
  }
}

// 연결리스트로 구현
class Node {
  item;
  next;
}

class Bag {
  // 연결리스트로 생성한 백, 테스트 코드를 바꾸지 않아도 동작하는 것을 보고 우리는 추상 데이터 타입을 잘 구현했다고 한다.
  #first; // 맨 처음 요소를 가리키는 일종의 포인터
  #n;

  constructor() {
    this.#n = 0;
  }

  add(item) {
    const oldFirst = this.#first;
    this.#first = new Node();
    this.#first.item = item;
    this.#first.next = oldFirst;

    this.#n++;
  }

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.#first === undefined;
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

test("백은 비어있는 상태로 생성된다", () => {
  const bag = new Bag();

  expect(bag.isEmpty()).toBe(true);
});

test("백에 값을 추가하면, 개수가 증가한다", () => {
  const bag = new Bag();

  const oldSize = bag.size();

  bag.add("D");

  const newSize = bag.size();

  expect(newSize - oldSize).toBe(1);
});

test("백의 모든 요소를 순회할 수 있다", () => {
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
