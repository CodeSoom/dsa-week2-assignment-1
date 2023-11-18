class Node {
  item;
  next;
}

class Stack {
  _n;
  _first;

  constructor() {
    this._n = 0;
  }

  push(item) {
    const newItem = new Node();

    if (this.isEmpty()) {
      this._first = newItem;
      this._first.item = item;
    } else {
      const oldFirst = this._first;

      this._first = newItem;
      this._first.item = item;
      this._first.next = oldFirst;
    }

    this._n = this._n + 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다');
    }

    const target = this._first;

    if (this._first.next) {
      this._first = this._first.next;
    } else {
      this._first = undefined;
    }

    this._n = this._n - 1;

    return target.item;
  }

  isEmpty() {
    return this._n === 0;
  }

  size() {
    return this._n;
  }

  [Symbol.iterator]() {
    let cur = this._first;

    return {
      next() {
        if (cur) {
          const value = cur.item;

          cur = cur.next;

          return { done: false, value };
        }

        return { done: true };
      }
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
