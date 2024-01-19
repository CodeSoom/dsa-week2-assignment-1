class Node {
  #item;

  #next;
}

class Stack {
  #first;

  #numberOfItem;

  constructor() {
    this.#numberOfItem = 0;
  }

  isEmpty() {
    return this.#numberOfItem === 0;
  }

  size() {
    return this.#numberOfItem;
  }

  push(item) {
    // todo : 맨 앞에 아이템을 넣는 방식.
    const oldFirst = this.#first;

    this.#first = new Node();
    this.#first.item = item;
    this.#first.next = oldFirst;

    this.#numberOfItem += 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다');
    }
    // todo: push 할 때 맨 앞에 가장 최근 아이템이 들어오니까 pop 할 때도 맨 앞에 있는 아이템을 꺼내야 한다.
    const latestItem = this.#first.item;
    this.#first = this.#first.next;

    this.#numberOfItem -= 1;

    return latestItem;
  }

  [Symbol.iterator]() {
    let current = this.#first;
    return {
      next() {
        if (current === undefined) {
          return { done: true };
        }

        const value = current.item;
        current = current.next;

        return { done: false, value };
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
