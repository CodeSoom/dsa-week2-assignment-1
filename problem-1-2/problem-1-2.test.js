class Node {
  item;
  next;
}

class Bag {
  #first;
  #n;

  constructor() {
    this.#n = 0;
  }

  isEmpty() {
    return this.#n === 0;
  }

  add(item) {
    const oldFirst = this.#first;

    this.#first = new Node();
    this.#first.item = item;
    this.#first.next = oldFirst;

    this.#n += 1;
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

const solution = (numbers) => {
  const bag = new Bag();

  numbers.forEach((number) => bag.add(number));

  let sum = 0;
  for (const number of bag) {
    sum += number;
  }
  return Math.floor(sum / bag.size());
};

test('숫자 배열의 평균을 반환한다', () => {
  expect(solution([1, 2, 3, 4, 5])).toEqual(3);
  expect(solution([1, 3, 5, 7, 9, 11])).toEqual(6);
  expect(solution([2, 4, 6, 8, 10, 12, 13, 14, 15])).toEqual(9);
});
