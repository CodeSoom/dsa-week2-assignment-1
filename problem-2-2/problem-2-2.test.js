const { Stack } = require('../problem-2-1/problem-2-1.test.js');

const solution = (string) => {
    const smallStack = new Stack();         // 소괄호
    const midStack = new Stack();           // 중괄호
    const bigStack = new Stack();           // 대괄호

    for (const char of string) {
        if (char == '(') smallStack.push(char);
        if (char == '{') midStack.push(char);
        if (char == '[') bigStack.push(char);

        if (char == ')') {
            if (smallStack.isEmpty()) return false;
            else smallStack.pop();
        }
        if (char == '}') {
            if (midStack.isEmpty()) return false;
            else midStack.pop();
        }
        if (char == ']') {
            if (bigStack.isEmpty()) return false;
            else bigStack.pop();
        }
    }

    return true;
};

// 지난 시간에 배운 재귀를 이용한 분할 정복 풀이법도 가능할 것 같은데 제가 구현을 못하겠습니다

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
