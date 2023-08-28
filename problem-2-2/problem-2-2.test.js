// 1. [스택 원리를 이용한 풀이]
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

// 2. [2-1번 스택api를 이용한 풀이]
// const Stack = require('../problem-2-1/problem-2-1.test');

// const pairs = { '}': '{', ']': '[', ')': '(' };
// const isClose = (firstChar) => ['(', '{', ']'].some((item) => item === firstChar);

// const solution = (string) => {
//   const stack = new Stack(string.length);

//   while (true) {
//     if (stack.isEmpty()) {
//       return true;
//     }
//     const firstChar = string[0];

//     if (isClose(firstChar)) {
//       if (stack.isEmpty()) {
//         return false; // stack이 이미 다 없어졌는데 닫는거 하나만 남아서 짝이 없을 때
//       }
//       if (pairs[firstChar] !== stack.pop()) {
//         return false;
//       }
//     } else {
//       stack.push(firstChar);
//     }
//     string = string.slice(1);
//   }
// };

// 3. [강의 해설]
const Stack = require('../problem-2-1/problem-2-1.test');

const pairs = { '}': '{', ']': '[', ')': '(' };

const isPair = (item, other) => pairs[item] === other;

const isClosedBracket = (char) => [')', '}', ']'].some((it) => char === it);

const solution = (string) => {
  const stack = new Stack(string.length);

  while (true) {
    if (string === '') {
      return stack.isEmpty(); // 스택이 비었으면 true, 아니면 false
    }

    const firstChar = string[0];

    if (isClosedBracket(firstChar)) {
      if (stack.isEmpty()) {
        return false; // 스택이 이미 다 제거되서 짝이 맞는 경우가 없는 경우 false
      }
      const topItem = stack.pop();
      if (!isPair(firstChar, topItem)) {
        return false; // 대칭이 안맞으면 false
      }
    } else {
      stack.push(firstChar);
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
