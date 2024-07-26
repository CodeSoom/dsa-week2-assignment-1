
//1. 백의 정의에 따라서 API를 설계해 주세요.
// | 함수 시그니처 | 설명 |
// | ----------- | ----------- | ----------- | ----------- | ----------- |
// | isEmpty(): boolean | 배열 빈값 여부에 따라 값을 boolean형태로 반환합니다 |
// | add(string): void | 아이템을 받아 배열에 추가합니다. |
// | size(): number | 배열의 길이를 반환합니다. |
// | ----------- | ----------- | ----------- | ----------- | ----------- |


//3. 클라이언트 코드가 올바르게 동작하도록 백 자료구조를 만들어 주세요.
class Bag {
  constructor(){
    this.bag = [];
  }

  isEmpty(){
    return this.bag.length === 0;
  }

  add(item){
    this.bag.push(item);
  }

  size(){
    return this.bag.length;
  }

  [Symbol.iterator](){
    let index = 0;
    const bag = [...this.bag];

    return {
      next(){
        return index < bag.length ? { done : false, value : bag[index++]} : { done : true};
      }
    }
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
