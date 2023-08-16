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
