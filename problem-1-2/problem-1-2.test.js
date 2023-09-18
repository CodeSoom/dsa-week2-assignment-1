class Bag {
  #items = [];

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#items.length;
  }

  add(item) {
    this.#items.push(item);
  }

  sum(operator = (acc, item) => acc + item, initialValue = 0) {
    return this.#items.reduce(operator, initialValue);
  }

  [Symbol.iterator]() {
    let index = 0;
    const data = [...this.#items];

    return {
      next() {
        if (index < data.length) {
          const value = data[index];
          index += 1;

          return {
            done: false,
            value,
          };
        }

        return { done: true };
      },
    };
  }
}

const solution = (numbers) => {
  const scores = new Bag();

  numbers.forEach((number) => {
    scores.add(number);
  });

  const operator = (acc, item) => acc + item;

  return Math.floor(scores.sum(operator, 0) / scores.size());
};

test('숫자 배열의 평균을 반환한다', () => {
  expect(solution([1, 2, 3, 4, 5])).toEqual(3);
  expect(solution([1, 3, 5, 7, 9, 11])).toEqual(6);
  expect(solution([2, 4, 6, 8, 10, 12, 13, 14, 15])).toEqual(9);
});
