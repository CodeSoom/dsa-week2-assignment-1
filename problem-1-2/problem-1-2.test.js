class Bag {
  #items = [];

  add(item) {
    this.#items.push(item);
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  [Symbol.iterator]() {
    let index = 0;
    let data = this.#items;

    return {
      next() {
        return index < data.length
          ? { done: false, value: data[index++] }
          : { done: true };
      },
    };
  }
}

const solution = (numbers) => {
  // 백을 만든다.
  const bag = new Bag();
  //백에 배열 요소들을 다 넣는다.
  for (let i = 0; i < numbers.length; i++) {
    bag.add(numbers[i]);
  }
  const iterator = bag[Symbol.iterator]();
  let size = numbers.length;
  let result = 0;

  while (size != 0) {
    result += iterator.next().value;
    size--;
  }
  return Math.floor(result / bag.size());
};

test("숫자 배열의 평균을 반환한다", () => {
  expect(solution([1, 2, 3, 4, 5])).toEqual(3);
  expect(solution([1, 3, 5, 7, 9, 11])).toEqual(6);
  expect(solution([2, 4, 6, 8, 10, 12, 13, 14, 15])).toEqual(9);
});
