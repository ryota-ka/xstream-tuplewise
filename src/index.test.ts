import { Stream } from 'xstream';
import { tuplewise } from '.';

describe(tuplewise, () => {
  describe('when n = 0', () => {
    const $ = Stream.of(0, 1, 2, 3, 4).compose(tuplewise(0));
    const expected = [[], [], [], [], [], []];

    it('unitwises elements', (complete) => {
      expect.assertions(6);

      $.addListener({
        next(x) {
          expect(x).toEqual(expected.shift());
        },
        complete,
      });
    });
  });

  describe('when n = 1', () => {
    const $ = Stream.of(0, 1, 2, 3, 4).compose(tuplewise(1));
    const expected = [[0], [1], [2], [3], [4]];

    it('monuplewises elements', (complete) => {
      expect.assertions(5);

      $.addListener({
        next(x) {
          expect(x).toEqual(expected.shift());
        },
        complete,
      });
    });
  });

  describe('when n = 2', () => {
    const $ = Stream.of(0, 1, 2, 3, 4).compose(tuplewise(2));
    const expected = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ];

    it('couplewises elements', (complete) => {
      expect.assertions(4);

      $.addListener({
        next(x) {
          expect(x).toEqual(expected.shift());
        },
        complete,
      });
    });
  });

  describe('when n = 4', () => {
    const $ = Stream.of(0, 1, 2, 3, 4).compose(tuplewise(4));
    const expected = [
      [0, 1, 2, 3],
      [1, 2, 3, 4],
    ];

    it('quadruplewises elements', (complete) => {
      expect.assertions(2);

      $.addListener({
        next(x) {
          expect(x).toEqual(expected.shift());
        },
        complete,
      });
    });
  });

  describe('when n = 3', () => {
    const $ = Stream.of(0, 1, 2, 3, 4).compose(tuplewise(3));
    const expected = [
      [0, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
    ];

    it('triplewises elements', (complete) => {
      expect.assertions(3);

      $.addListener({
        next(x) {
          expect(x).toEqual(expected.shift());
        },
        complete,
      });
    });
  });

  describe('when n = 5', () => {
    const $ = Stream.of(0, 1, 2, 3, 4).compose(tuplewise(5));
    const expected = [[0, 1, 2, 3, 4]];

    it('quintuplewises elements', (complete) => {
      expect.assertions(1);

      $.addListener({
        next(x) {
          expect(x).toEqual(expected.shift());
        },
        complete,
      });
    });
  });

  describe('when n = 6', () => {
    const $ = Stream.of(0, 1, 2, 3, 4).compose(tuplewise(6));

    it('does not emit a value', (complete) => {
      expect.assertions(0);

      $.addListener({
        next(_) {
          throw new Error('should not happen');
        },
        complete,
      });
    });
  });
});
