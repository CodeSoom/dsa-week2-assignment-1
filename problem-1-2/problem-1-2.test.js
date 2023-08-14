const { Bag } = require("../problem-1-1/problem-1-1.test.js");

const solution = (numbers) => {
    const bag = new Bag();
    numbers.forEach(x => bag.add(x));

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
