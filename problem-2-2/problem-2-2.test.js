// [나의 풀이]
/*
const solution = (string) => {
  const sign = {
    '{': '}', '[': ']', '(': ')',
  };
  const stack = [];

  string.split('').forEach((str) => {
    const lastStack = stack[stack.length - 1];
    if (lastStack === str) {
      stack.pop();
    } else {
      stack.push(sign[str]);
    }
  });

  return stack.length === 0;
};
*/

// [강의 해설]

const Stack = require('../problem-2-1/problem-2-1.test');

const pairs = { '}': '{', ']': '[', ')': '(' };

const isPair = (item, other) => pairs[item] === other;

const isClosedBracket = (char) => [')', '}', ']'].some((it) => char === it);

const solution = (string) => {
  const stack = new Stack(string.length);

  while (true) {
    if (string === '') {
      return stack.isEmpty();
    }

    const char = string[0];

    if (isClosedBracket(char)) {
      if (stack.isEmpty()) {
        return false;
      }
      const item = stack.pop();
      if (!isPair(char, item)) {
        return false;
      }
    } else {
      stack.push(char);
    }

    string = string.slice(1);
  }
};

test.only('문자열에 포함된 괄호의 짝이 맞을 때 true를 반환한다', () => {
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
