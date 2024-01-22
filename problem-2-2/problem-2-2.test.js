class Node {
  item;

  next;
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

const solution = (string) => {
  const stack = new Stack(string.length);
  const brackets = { '[': ']', '{': '}', '(': ')' };

  if (string === '') {
    return stack.isEmpty();
  }

  for (const char of string) {
    if (brackets[char]) { // 현재 문자가 열린 괄호라면 = [, {, (
      stack.push(char);
    } else { // 현재 문자가 닫힌 괄호라면 = ], }, )
      if (stack.isEmpty()) { // 현재 스택이 비어 있다면 false
        return false;
      }

      const topChar = stack.pop();
      if (brackets[topChar] !== char) { // 가장 위의 아이템을 꺼내서 짝이 맞는지 비교한다.
        return false;
      }
    }
  }

  return stack.isEmpty();
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
