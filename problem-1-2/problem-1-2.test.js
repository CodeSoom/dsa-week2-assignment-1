const solution = (numbers = []) => {
  if(numbers.length === 0) return 0;
  
  const total = numbers.reduce((acc, curr) => acc + curr, 0),
        average = total / numbers.length;

  return Math.floor(average);
  
};

test('숫자 배열의 평균을 반환한다', () => {
  expect(solution([1, 2, 3, 4, 5])).toEqual(3);
  expect(solution([1, 3, 5, 7, 9, 11])).toEqual(6);
  expect(solution([2, 4, 6, 8, 10, 12, 13, 14, 15])).toEqual(9);
});
