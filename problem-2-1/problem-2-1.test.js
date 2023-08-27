// [1] API 설계
/*
 Stack() - 스택 생성
 push(item):void - 스택에 값 추가
 pop():item - 가장 최근에 추가된 아이템 꺼내기
 isEmpty():boolean - 스택이 비어있으면 true, 아니면 false 반환
 */

// [2] 그림
/*
| E |
| L |
| P |
| M,(제거2) |
| A(제거3) |
| X |
| A(제거1) |
| S |
| D |
ㅡㅡㅡㅡ
*/

// [3] 배열을 사용한 스택 자료구조
/*
Stack(capacity) - 스택 생성
push(item):void - 스택에 문자열 추가
pop():void - 가장 최근에 추가된 아이템 꺼내기
size():number - 스택의 아이템 수 반환
isFull() - 스택이 다 찼는지 확인
isOneQuarter() - 스택의 아이템 수가 1/4 이하인지 확인
*/
class Stack {
  #capacity; // # : private로 선언. 따라서 class외부에선 접근할 수 없음

  #n;

  #items;

  constructor(capacity) {
    this.#capacity = capacity;
    this.#n = 0; // item 갯수
    this.#items = new Array(capacity);
  }

  push(item) {
    if (this.isFull()) {
      this.#resize(this.#capacity * 2); // [강의]
    }
    this.#items[this.#n] = item;
    this.#n++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다');
    }
    if (this.isOneQuarter()) {
      this.#resize(Math.floor(this.#capacity / 2)); // [강의]
    }

    this.#n--;
    return this.#items[this.#n];
  }

  #resize(size) {
    const newItems = new Array(size);
    this.#items.forEach((el, index) => {
      newItems[index] = el;
    });
    this.#items = newItems;
    this.#capacity = size;
  }

  size() {
    return this.#n;
  }

  isFull() {
    return this.#n >= this.#capacity;
  }

  isOneQuarter() {
    return this.#n <= this.#capacity / 4 && this.#n > 0;
  }

  isEmpty() {
    return this.#n === 0;
  }

  [Symbol.iterator]() {
    let index = this.#n;
    const data = this.#items;

    return {
      next() {
        index--; // 클로져의 원리 때문에 함수 스코프가 사라져도 index값을 참조할 수 있는것
        if (index >= 0) {
          return { done: false, value: data[index] };
        }
        return { done: true };
      },
    };
  }
}

module.exports = Stack;

// [4] 연결리스트를 사용한 스택 자료구조
class Node {
  item;

  next;
}

class Stack0 {
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
    if (this.isEmpty()) {
      throw new Error('스택이 비어있습니다');
    }

    const result = this.#first.item;

    this.#first = this.#first.next;
    this.#n--;

    return result;
  }

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.#first === undefined;
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

test('스택을 생성하면 비어있다', () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toEqual(true);
});

test('스택에 값을 추가하면 개수가 증가한다', () => {
  const stack = new Stack();

  const oldSize = stack.size();

  stack.push('D');

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(1);
});

test('스택에서 요소를 제거하면 개수가 감소한다', () => {
  const stack = new Stack();

  stack.push('D');

  const oldSize = stack.size();

  stack.pop();

  const newSize = stack.size();

  expect(newSize - oldSize).toEqual(-1);
});

test('가장 최근에 삽입한게 먼저 나온다', () => {
  const stack = new Stack();

  stack.push('D');
  stack.push('S');
  stack.push('A');

  expect(stack.pop()).toBe('A');
  expect(stack.pop()).toBe('S');
  expect(stack.pop()).toBe('D');
});

// test('스택이 비어있는데 pop을 하면 예외를 던진다', () => {
//   const stack = new Stack();

//   stack.push('D');
//   stack.push('S');
//   stack.push('A');

//   stack.pop();
//   stack.pop();
//   stack.pop();

//   expect(() => {
//     stack.pop();
//   }).toThrowError('스택이 비어있습니다');
// });

// test('스택은 역순으로 순회한다', () => {
//   const data = ['D', 'S', 'A', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];

//   const stack = new Stack();

//   data.forEach((i) => {
//     stack.push(i);
//   });

//   const output = [];

//   for (const item of stack) {
//     output.push(item);
//   }

//   expect(output.reverse()).toEqual(data);
// });
