import { deepEquals } from 'src/core/functions/deep-equals';

describe('deepEquals test', () => {
  it('["a","b","c"] == ["a","b","c"]', () => {
    const a = ['a', 'b', 'c'];
    const b = ['a', 'b', 'c'];
    expect(deepEquals(a, b)).toBe(true);
  });
  it('["a","b","c"] != ["d","b","c"]', () => {
    const a = ['a', 'b', 'c'];
    const b = ['d', 'b', 'c'];
    expect(deepEquals(a, b)).toBe(false);
  });
  it('09/05/2022 == 09/05/2022', () => {
    const a = new Date(2022, 5, 9);
    const b = new Date(2022, 5, 9);
    expect(deepEquals(a, b)).toBe(true);
  });
  it('09/05/2022 != 08/05/2022', () => {
    const a = new Date(2022, 5, 9);
    const b = new Date(2022, 5, 8);
    expect(deepEquals(a, b)).toBe(false);
  });
  it('4 == 4', () => {
    expect(deepEquals(4, 4)).toBe(true);
  });
  it('4 != 5', () => {
    expect(deepEquals(4, 5)).toBe(false);
  });
  it('{hello: "World"} == {hello: "World"}', () => {
    const a = { hello: 'World' };
    const b = { hello: 'World' };
    expect(deepEquals(a, b)).toBe(true);
  });
  it('{hello: "World"} != {hello: "Mars"}', () => {
    const a = { hello: 'World' };
    const b = { hello: 'Mars' };
    expect(deepEquals(a, b)).toBe(false);
  });
});
