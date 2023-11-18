class Node {
  item;
  next;
}

class Bag {
  _n;
  _first;
  _sum;

  constructor() {
    this._n = 0;
    this._sum = 0;
  }

  add(item) {
    const newItem = new Node();

    if (this.isEmpty()) {
      this._first = newItem;
      this._first.item = item;
    } else {
      const oldFirst = this._first;

      this._first = newItem;
      this._first.item = item;
      this._first.next = oldFirst;
    }

    this._n = this._n + 1;
  }

  isEmpty() {
    return this._n === 0;
  }

  size() {
    return this._n;
  }

  [Symbol.iterator]() {
    let cur = this._first;

    return {
      next() {
        if (cur) {
          const value = cur.item;

          cur = cur.next;

          return { done: false, value };
        }

        return { done: true };
      }
    };
  }
}

const solution = (numbers) => {
  const bag = new Bag();

  for (const num of numbers) {
    bag.add(num);
  }

  let sum = 0;
  for (const item of bag) {
    sum += item;
  }

  return Math.floor(sum / bag.size());
};

test('숫자 배열의 평균을 반환한다', () => {
  expect(solution([1, 2, 3, 4, 5])).toEqual(3);
  expect(solution([1, 3, 5, 7, 9, 11])).toEqual(6);
  expect(solution([2, 4, 6, 8, 10, 12, 13, 14, 15])).toEqual(9);
});
