class Bag {
  #bag = [];

  isEmpty() {
    return this.#bag.length === 0;
  }

  add(item) {
    this.#bag.push(item);
  }

  size() {
    return this.#bag.length;
  }

  sum() {
    const initialValue = 0;
    return this.#bag.reduce((acc, currentValue) => acc + currentValue, initialValue);
  }

  average() {
    return Math.floor(this.sum() / this.size());
  }

  [Symbol.iterator]() {
    let index = 0;
    const bag = [...this.#bag];

    return {
      next() {
        return index < bag.length
          ? { done: false, value: bag[index++] }
          : { done: true };
      },
    };
  }
}

const solution = (numbers) => {
  const bag = new Bag();

  numbers.forEach((number) => {
    bag.add(number);
  });

  return bag.average();
};

test('숫자 배열의 평균을 반환한다', () => {
  expect(solution([1, 2, 3, 4, 5])).toEqual(3);
  expect(solution([1, 3, 5, 7, 9, 11])).toEqual(6);
  expect(solution([2, 4, 6, 8, 10, 12, 13, 14, 15])).toEqual(9);
});
