const { Queue } = require('../problem-3-1/problem-3-1.test.js');

const solution = (N, M) => {
    const queue = new Queue();
    for (let i = 1; i <= N; i++) {
        queue.enqueue(i);
    }

    while (queue.size() > 1) {
        for (let i = 0; i < (M - 1); i++) {
            queue.enqueue(queue.dequeue());
        }
        queue.dequeue();
    }

    return queue.dequeue();
};

test('N명의 사람이 있을 때 M번째 사람을 없앨 때 마지막에 죽는 사람의 순서를 반환한다', () => {
  expect(solution(7, 3)).toEqual(4);
  expect(solution(7, 2)).toEqual(7);
  expect(solution(10, 3)).toEqual(4);
});
