// Bag : 추가만 할  수 있고, 개수를 셀 수 있고, 순회할 수  있다.

/* [1] API 설계

Bag() - 백 생성
add(item:any):void - 백에 아이템 추
size():number - 백에 들어있는 아이템 개수 반환
isEmpty():boolean - 백이 비어있으면 true, 아니면 false
*/

/*
[2] 백에 추가했을 떄의 그림

|   E         L         A    |
|       S     D      M     E |
|   X       P           A    |
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
*/

// [3] 백 자료구조
// class Bag {
//   #items;

//   constructor() {
//     this.#items = [];
//   }

//   add(item) {
//     this.#items.push(item);
//   }

//   isEmpty() {
//     return this.#items.length === 0;
//   }

//   size() {
//     return this.#items.length;
//   }

//   [Symbol.iterator]() {
//     let index = this.#items.length;
//     const data = [...this.#items];

//     return {
//       next() {
//         index = index - 1;
//         if (index >= 0) {
//           return { done: false, value: data[index] };
//         }
//         return { done: true };
//       },
//     };
//   }
// }

// ---------------------------------------------------------------
// [3] 강의 해설
class Bag {
  #items;

  #n;

  constructor(capacity = 10) {
    this.#n = 0;
    this.#items = new Array(capacity);
  }

  add(item) {
    this.#items[this.#n] = (item);
    this.#n++;
  }

  size() {
    return this.#n;
  }

  isEmpty() {
    return this.#n === 0;
  }

  [Symbol.iterator]() {
    let index = 0;
    const length = this.#n;
    const data = [...this.#items];

    return {
      next() {
        if (index < length) {
          return { done: false, value: data[index++] };
        }
        return { done: true };
      },
    };
  }
}
module.exports = Bag;

// [4] Linked List(연결리스트)로
// class Node {
//   item;

//   next;
// }

// class Bag {
//   #first;

//   #n;

//   constructor() {
//     this.#n = 0;
//   }

//   add(item) {
//     const oldFirst = this.#first;

//     this.#first = new Node();
//     this.#first.item = item;
//     this.#first.next = oldFirst;

//     this.#n++;
//   }

//   size() {
//     return this.#n;
//   }

//   isEmpty() {
//     return this.first === undefined;
//   }

//   [Symbol.iterator]() {
//     let current = this.#first;
//     return {
//       next() {
//         if (current === undefined) {
//           return { done: true };
//         }

//         const value = current.item;
//         current = current.next;
//         return { done: false, value };
//       },
//     };
//   }
// }

test('백은 비어있는 상태로 생성된다', () => {
  const bag = new Bag();

  expect(bag.isEmpty()).toBe(true);
});

test('백에 값을 추가하면, 개수가 증가한다', () => {
  const bag = new Bag();

  const oldSize = bag.size();

  bag.add('D');

  const newSize = bag.size();

  expect(newSize - oldSize).toBe(1);
});

test('백의 모든 요소를 순회할 수 있다', () => {
  const bag = new Bag();

  [1, 3, 5, 7, 9].forEach((i) => {
    bag.add(i);
  });

  let sum = 0;

  for (const item of bag) {
    sum += item;
  }

  expect(sum).toBe(25);
});
