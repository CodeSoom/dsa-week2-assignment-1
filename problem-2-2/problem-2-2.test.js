class Stack {
  constructor(){
    this.stack = [];
  }

  isEmpty(){
    return this.stack.length === 0;
  }

  push(item){
    this.stack.push(item);
  }

  size(){
    return this.stack.length;
  }

  pop(){
    if(this.isEmpty()) throw new Error('스택이 비어있습니다');

    return this.stack.pop();
  }

  [Symbol.iterator](){
    let index = 0,
        stack = [...this.stack];
        stack = stack.reverse();

    return {
      next(){
        return index < stack.length ? {done : false, value : stack[index++]} : {done : true}
      }
    }

  }
}

const solution = (string = '') => {
  if(string.length % 2 === 1 || string.length === 0) return false;

  const stack = new Stack();
  const brackets = { '[': ']', '{': '}', '(': ')' };

  for (const bracket of string) {
    if(brackets[bracket]){
      stack.push(bracket);
    }else{

      if(stack.isEmpty()) return false;

      const savedBracket = stack.pop();
    
      if(brackets[savedBracket] !== bracket) return false;
    }
  }

  return true;

};

test('문자열에 포함된 괄호의 짝이 맞지 않을 때 false를 반환한다', () => {
  expect(solution('()(')).toBe(false);
});

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
