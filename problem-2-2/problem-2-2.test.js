class Node {
  item;
  next;
}

class Stack {
  #first;
  #n;

  constructor() {
    this.#n = 0;
  }

  push(item) {
    const oldFirst = this.#first;

    this.#first = new Node();
    this.#first.item = item;
    this.#first.next = oldFirst;

    this.#n++;
  }

  pop() {
    if (this.#first === undefined) {
      throw new Error('스택이 비어있습니다');
    }

    const item = this.#first.item;
    this.#n--;
    this.#first = this.#first.next;

    return item;
  }

  isEmpty() {
    return this.#first === undefined;
  }

  size() {
    return this.#n;
  }

  [Symbol.iterator]() {
    let current = this.#first;

    return {
      next: () => {
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

const pairs = {
  '(': ')',
  '{': '}',
  '[': ']',
};
const isPair = (item, other) => pairs[item] === other;

const isCloseBracket = (char) => [')', '}', ']'].some((it) => it === char);

const solution = (string) => {
  const stack = new Stack();

  while (true) {
    if (string === '') {
      return stack.isEmpty();
    }

    const char = string[0];

    if (isCloseBracket(char)) {
      if (stack.isEmpty()) {
        return false;
      }
      const item = stack.pop();
      if (!isPair(item, char)) {
        return false;
      }
    } else {
      stack.push(char);
    }

    string = string.slice(1);
  }
};

test('문자가 닫힌 괄호면 true를 반환한다', () => {
  expect(isCloseBracket(')')).toBe(true);
  expect(isCloseBracket('}')).toBe(true);
  expect(isCloseBracket(']')).toBe(true);
});

test('문자가 닫힌 괄호가 아니면 false를 반환한다', () => {
  expect(isCloseBracket('(')).toBe(false);
});

test('빈 문자열은 true를 반환한다', () => {
  expect(solution('')).toBe(true);
});

test('괄호가 열린채로 끝나면 false를 반환한다.', () => {
  expect(solution('()(')).toBe(false);
});

test('열지 않았는데 닫으면 false를 반환한다.', () => {
  expect(solution(')')).toBe(false);
});

test('문자열에 포함된 괄호의 짝이 맞을 때 true를 반환한다', () => {
  expect(solution('{([])}')).toBe(true);
});

test('문자열에 포함된 괄호의 짝이 맞지 않을 때 false를 반환한다', () => {
  expect(solution(')[](')).toBe(false);
  expect(solution('[)')).toBe(false);
});

test('문자에 여는 괄호만 있고 닫는 괄호는 없을 때 false를 반환한다', () => {
  expect(solution(')[{}()[]]')).toBe(false);
});

test('여는 괄호가 앞에 나오지 않았는데 닫는 괄호가 나오는 경우에는 false를 반환한다', () => {
  expect(solution('([{}[]]{)})')).toBe(false);
});
