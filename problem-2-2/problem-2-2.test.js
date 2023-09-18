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
    this.#n += 1;
    this.#items[this.#n] = item;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다');
    }

    const item = this.#items[this.#n];

    this.#items[this.#n] = undefined;

    this.#n -= 1;

    return item;
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

const bracketPairs = {
  ')': '(',
  '}': '{',
  ']': '[',
};

const solution = (bracekts = '') => {
  const stack = new Stack(bracekts.length);

  for (let i = 0; i < bracekts.length; i++) {
    const bracket = bracekts.charAt(i);

    if (bracket === '}' || bracket === ')' || bracket === ']') {
      if (stack.isEmpty()) {
        return false;
      }

      const popped = stack.pop();

      if (bracketPairs[bracket] !== popped) {
        return false;
      }
    } else {
      stack.push(bracket);
    }
  }

  return true;
};

test('문자열에 포함된 괄호의 짝이 맞을 때 true를 반환한다', () => {
  expect(solution('{([])}')).toBe(true);
});

test('문자열에 포함된 괄호의 짝이 맞지 않을 때 false를 반환한다', () => {
  expect(solution(')[](')).toBe(false);
});

test('문자에 여는 괄호만 있고 닫는 괄호는 없을 때 false를 반환한다', () => {
  expect(solution(')[{}()[]]')).toBe(false);
});

test('여는 괄호가 앞에 나오지 않았는데 닫는 괄호가 나오는 경우에는 false를 반환한다', () => {
  expect(solution('([{}[]]{)})')).toBe(false);
});
