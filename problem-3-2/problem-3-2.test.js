const solution = (N, M) => {
  let arr = new Array(N).fill(null);
  arr = arr.map((_, i) => i + 1);

  while (true) {
    arr.splice(M - 1, 1);

    if (arr.length === 2) {
      return arr[1];
    }
    arr = [...arr.slice(M - 1), ...arr.slice(0, M - 1)];
  }
};

test('N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다', () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
