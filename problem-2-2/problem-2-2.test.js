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

const solution = (string) => {
  const stack = new Stack();

  const open = ['{', '(', '[']; // open 일때 push
  const pair = { // close 일때 pop
    '}': '{',
    ')': '(',
    ']': '[',
  };

  for (const str of string) {
    const isOpenBracket = open.includes(str);

    if (isOpenBracket) {
      stack.push(str);
    } else {
      try {
        const popped = stack.pop();

        if (!pair[str] === popped) {
          return false;
        }
      } catch(e) {
        return false;
      }
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
