/*
// [나의풀이]
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
*/
// [피드백] - 특정 길이의 배열을 만드는 방법
// 내가 한 방법 : new Array(N).fill() <- 이렇게 하는 방법 보단, 아래 방법으로 더 많이 씀
// 일반적인 방법 : Array.from({ length: N }, (_, i) => i + 1)); // !!

// [강의 해설]
const Queue = require('../problem-3-1/problem-3-1.test');

const finalPosition = (queue, M) => {
  if (queue.size() === 1) {
    return queue.dequeue();
  }

  for (let i = 0; i < M - 1; i += 1) {
    queue.enqueue(queue.dequeue());
  }
  queue.dequeue();
  return finalPosition(queue, M);
};

const solution = (N, M) => {
  const queue = new Queue();

  const arr = Array.from({ length: N }, (_, index) => index + 1);
  arr.forEach((item) => {
    queue.enqueue(item);
  });

  return finalPosition(queue, M);
};

test('N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다', () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
