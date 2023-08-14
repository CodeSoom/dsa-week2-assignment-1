/*
    1. 함수 시그니처
    push(number): void      숫자를 입력으로 받아 자료구조에 추가하고 반환값은 없다
    pop(): number           입력값은 받지 않고 자료구조 내 가장 마지막으로 추가된 값을 제거하며, 해당 값을 반환한다
    getSize(): number       자료구조가 저장하고 있는 데이터의 개수를 반환한다
    isEmpty(): boolean      자료구조가 비어있는지 여부를 불리언 값으로 반환한다
    isFull(): boolean       자료구조가 저장하고 있는 자료의 개수가 자료구조의 크기와 같은지 불리언 값으로 반환한다


    2. 스택 그림
    =========================
    |   D, S, X, P, L, E
    =========================
*/


// 3. 내부 데이터 자료형이 배열인 스택
class Stack {

    #capacity;
    #items;
    #size;

    constructor(capacity) {
        this.#capacity = capacity;
        this.#items = new Array(capacity);
        this.#size = 0;
    }

    push(item) {
        if (this.isFull()) {
            this.#capacity = this.#capacity * 2;
        }

        this.#size = this.#size + 1;
        this.#items.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('스택이 비어있습니다');
        }
        if (this.#size < this.#capacity / 4) {
            this.#capacity = Math.ceil(this.#capacity / 2);
        }

        this.#size = this.#size - 1;
        return this.#items.pop();
    }

    getSize() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    isFull() {
        return this.#size >= this.#capacity;
    }

    [Symbol.iterator]() {
        let index = this.#size;
        let data = this.#items;

        return {
            next() {
                return index > 0
                    ? { done: false, value: data[index--] }
                    : { done: true };
            }
        };
    }
}


// 4. 연결 리스트를 이용한 스택
class LinkedStack {
    #first;
    #size;

    constructor() {
        this.#size = 0;
    }

    add(item) {
        this.#first = new Node(item, this.#first);
        this.#size = this.#size + 1;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('스택이 비어있습니다');
        }

        const popNode = this.#first;
        this.#first = popNode.getNext();
        this.#size = this.#size - 1;

        return popNode.getItem();
    }

    getSize() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }
}

class Node {
    #item;
    #next;

    constructor(item, next) {
        this.#item = item;
        this.#next = next;
    }

    getItem() {
        return this.#item;
    }

    getNext() {
        return this.#next;
    }
}

module.exports = { Stack };

test('스택을 생성하면 비어있다', () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toEqual(true);
});

test('스택에 값을 추가하면 개수가 증가한다', () => {
  const stack = new Stack();

  const oldSize = stack.getSize();

  stack.push('D');

  const newSize = stack.getSize();

  expect(newSize - oldSize).toEqual(1);
});

test('스택에서 요소를 제거하면 개수가 감소한다', () => {
  const stack = new Stack();

  stack.push('D');

  const oldSize = stack.getSize();

  stack.pop();

  const newSize = stack.getSize();

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

test('스택이 비어있는데 pop을 하면 예외를 던진다', () => {
  const stack = new Stack();

  stack.push('D');
  stack.push('S');
  stack.push('A');

  stack.pop();
  stack.pop();
  stack.pop();

  expect(() => {
    stack.pop();
  }).toThrowError('스택이 비어있습니다');
});

test('스택은 역순으로 순회한다', () => {
  const data = ['D', 'S', 'A', 'E', 'X', 'A', 'M', 'P', 'L', 'E'];

  const stack = new Stack();

  data.forEach((i) => {
    stack.push(i);
  });

  const output = [];

  for (const item of stack) {
    output.push(item);
  }

  expect(output.reverse()).toEqual(data);
});

// ====================================== //

test('연결리스트 스택을 생성하면 비어있다', () => {
  const stack = new LinkedStack();

  expect(stack.isEmpty()).toEqual(true);
});

test('연결리스트 스택에 값을 추가하면 개수가 증가한다', () => {
  const stack = new LinkedStack();

  const oldSize = stack.getSize();

  stack.add('D');

  const newSize = stack.getSize();

  expect(newSize - oldSize).toEqual(1);
});

test('연결리스트 스택에서 요소를 제거하면 개수가 감소한다', () => {
  const stack = new LinkedStack();

  stack.add('D');

  const oldSize = stack.getSize();

  stack.pop();

  const newSize = stack.getSize();

  expect(newSize - oldSize).toEqual(-1);
});

test('가장 최근에 삽입한게 먼저 나온다', () => {
  const stack = new LinkedStack();

  stack.add('D');
  stack.add('S');
  stack.add('A');

  expect(stack.pop()).toBe('A');
  expect(stack.pop()).toBe('S');
  expect(stack.pop()).toBe('D');
});

test('스택이 비어있는데 pop을 하면 예외를 던진다', () => {
  const stack = new LinkedStack();

  stack.add('D');
  stack.add('S');
  stack.add('A');

  stack.pop();
  stack.pop();
  stack.pop();

  expect(() => {
    stack.pop();
  }).toThrowError('스택이 비어있습니다');
});
