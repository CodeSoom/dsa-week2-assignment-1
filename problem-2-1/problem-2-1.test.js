class Stack {
  #capacity;

  #numberOfItem;

  #items;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#numberOfItem = 0;
    this.#items = new Array(capacity);
  }

  push(item) {
    // Last In, First Out = LIFO
    // todo: 아이템을 추가할 때 더 이상 추가할 수 없다면 배열의 크기를 2배로 늘리기
    if (this.isFull()) {
      this.#capacity = this.#capacity * 2;
    }

    this.#items[this.#numberOfItem] = item;
    this.#numberOfItem += 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다.');
    }

    // todo: 아이템을 제거할 때 아이템의 수가 1 / 4이하라면 배열의 크기를 1/2로 줄이기
    if (this.isLessThanQuarter()) {
      this.#capacity = this.#capacity / 2;
    }

    this.#numberOfItem -= 1;
    return this.#items[this.#numberOfItem];
  }

  isLessThanQuarter() {
    return this.#numberOfItem <= this.#capacity / 4;
  }

  isEmpty() {
    return this.#numberOfItem === 0;
  }

  size() {
    return this.#numberOfItem;
  }

  isFull() {
    return this.#numberOfItem === this.#capacity;
  }

  [Symbol.iterator]() {
    let numberOfItem = this.#numberOfItem;
    const items = this.#items;

    return {
      next() {
        numberOfItem = numberOfItem - 1;
        return numberOfItem >= 0 ? { done: false, value: items[numberOfItem] } : { done: true };
      },
    };
  }
}

test('스택을 생성하면 비어있다', () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toEqual(true);
});

test('스택에 값을 추가하면 개수가 증가한다', () => {
  const stack = new Stack();

  const oldSize = stack.size();

  stack.push('D');

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(1);
});

test('스택에서 요소를 제거하면 개수가 감소한다', () => {
  const stack = new Stack();

  stack.push('D');

  const oldSize = stack.size();

  stack.pop();

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(-1);
});

test('가장 최근에 삽입한게 먼저 나온다', () => {
  const stack = new Stack();

  stack.push('D');
  stack.push('S');
  stack.push('A');

  expect(stack.pop()).toBe('A');
  expect(stack.pop()).toBe('S');
  expect(stack.pop()).toBe('D');
});

test('스택이 비어있는데 pop을 하면 예외를 던진다', () => {
  const stack = new Stack();

  stack.push('D');
  stack.push('S');
  stack.push('A');

  stack.pop();
  stack.pop();
  stack.pop();

  expect(() => {
    stack.pop();
  }).toThrowError('스택이 비어있습니다');
});

test('스택은 역순으로 순회한다', () => {
  const data = ['D', 'S', 'A', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];

  const stack = new Stack();

  data.forEach((i) => {
    stack.push(i);
  });

  const output = [];

  for (const item of stack) {
    output.push(item);
  }

  expect(output.reverse()).toEqual(data);
});
