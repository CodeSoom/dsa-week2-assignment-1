class Queue {
  constructor(){
    this.items = [];
  }

  isEmpty(){
    return this.items.length === 0;
  }

  size(){
    return this.items.length;
  }

  enqueue(item){
    this.items.push(item);
  }

  dequeue(){
    if(this.size() === 0) throw new Error('큐가 비어있습니다');

    const item = this.items.shift();
    return item;
  }

  setNumbers(number){
    for(let i = 1; i <= number; i++){
      this.enqueue(i);
    }
  }

  [Symbol.iterator](){
    let index = 0;
    const queue = [...this.items];

    return {
      next() {
        return index < queue.length
          ? { done: false, value: queue[index++] }
          : { done: true };
      },
    };
  }


}

const solution = (N, M) => {
  const queue = new Queue();
  queue.setNumbers(N);

  while (queue.size() > 1) {
    for (let index = 0; index < M - 1; index += 1) {
      const dequeuedNumber = queue.dequeue();
      queue.enqueue(dequeuedNumber);
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
