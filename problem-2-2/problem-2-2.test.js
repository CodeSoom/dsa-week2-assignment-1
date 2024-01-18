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
