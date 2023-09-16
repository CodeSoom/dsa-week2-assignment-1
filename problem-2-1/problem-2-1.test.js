class Stack {
  #n = -1;

  #items;

  #capacity;

  constructor(capacity = 0) {
    this.#capacity = capacity;
    this.#items = Array(capacity).fill(undefined);
  }

  isFull() {
    return this.size() === this.#capacity;
  }

  isEmpty() {
    return this.#n === -1;
  }

  size() {
    return this.#n + 1;
  }

  push(item) {
    if (this.isFull()) {
      const newItems = Array(this.#capacity).fill(undefined);
      this.#items = this.#items.concat(newItems);
      this.#capacity *= 2;
    }

    this.#n += 1;
    this.#items[this.#n] = item;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다');
    }

    const popped = this.#items[this.#n];

    // TODO: 이렇게 구현하는 이유는?
    this.#items[this.#n] = undefined;

    this.#n -= 1;

    if (this.size() === (this.#capacity / 4)) {
      this.#capacity /= 2;

      this.#items = this.#items.slice(0, this.#capacity);
    }

    return popped;
  }

  get length() {
    return this.#capacity;
  }

  [Symbol.iterator]() {
    let index = this.#items.length - 1;
    const data = [...this.#items];

    return {
      next() {
        if (index >= 0) {
          const value = data[index];
          index -= 1;

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

test('스택에 더이상 추가할 수 없을 경우 크기가 2배로 늘어난다', () => {
  const data = ['D', 'S', 'A', 'E'];

  const capacity = 3;
  const stack = new Stack(capacity);

  data.forEach((i) => {
    stack.push(i);
  });

  expect(stack.length).toBe((2 * capacity));
});

test('아이템을 제거할 때 아이템의 수가 1 / 4이하라면 배열의 크기가 1/2로 줄어든다', () => {
  const data = ['D', 'S', 'A', 'E'];

  const capacity = 4;
  const stack = new Stack(capacity);

  data.forEach((i) => {
    stack.push(i);
  });

  stack.pop();
  stack.pop();
  stack.pop();

  expect(stack.length).toBe((capacity / 2));
});
