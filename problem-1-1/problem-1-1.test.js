/* [1] API 설계

Bag() - 백 생성
add(string):void - 백에 문자열 추가
convert(string):number - 문자열을 숫자형으로 변환
*/

/*
[2] 백에 추가했을 떄의 그림

|   E         L         A    |
|       S     D      M     E |
|   X       P           A    |
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
*/

// [3] 백 자료구조
class Bag {
  #items;

  constructor() {
    this.#items = [];
  }

  add(item) {
    this.#items.push(item);
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  [Symbol.iterator]() {
    let index = this.#items.length;
    const data = [...this.#items];

    return {
      next() {
        index = index - 1;
        if (index >= 0) {
          return { done: false, value: data[index] };
        }
        return { done: true };
      },
    };
  }
}

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
