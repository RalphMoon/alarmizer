import { describe, expect, it } from 'vitest';
import reducer, { setAlarm } from './slices/alarm';

it('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    storage: {},
  });
});

describe('reducer function unit test: setAlarm', () => {
  const mockEntity = {
    dates: ['1997-10-31', '2023-05-12', '2211-09-19', '19840-12-31',],
    times: ['10:26', '22:14', '15:39', '1915353:1434934',],
    length: 4,
  };
  const repeat = function (callback, count) {
    for (let i = 0; i < count; i++) {
      const dates = mockEntity.dates;
      const times = mockEntity.times;

      callback(dates[i], times[i]);
    }
  };
  const getStorage = function (payload) {
    const { storage } = reducer(undefined, setAlarm(payload));

    return storage;
  };

  it('should return itself when there is no id property in the storage', () => {
    expect(getStorage({ a : 1 })).toEqual({ a : 1 });
  });

  it('should normalize state by splitting id property into the date and time', () => {
    const evaluate = function (date, time) {
      const normalizedState = getStorage({ id: `${date}T${time}` });

      expect(normalizedState).toHaveProperty(date);
      expect(normalizedState[date]).toHaveProperty(time);
    };

    repeat(evaluate, mockEntity.length);
  });

  it('should concat the second with 2-digit the leaf which is the id property', () => {
    const evaluate = function (date, time) {
      const id = `${date}T${time}`;
      const normalizedState = getStorage({ id: id });
      const child = JSON.parse(JSON.stringify(normalizedState[date][time]));

      expect(id + ':00').toEqual(child.id);
    }

    repeat(evaluate, mockEntity.length);
  });

  it('should only have two particular leaf nodes that have never been passed', () => {
    const evaluate = function (date, time) {
      const id = `${date}T${time}`;
      const normalizedState = getStorage({ id: id });
      const child = JSON.parse(JSON.stringify(normalizedState[date][time]));

      delete child.id;

      expect(child).toEqual({
        disabled: false,
        urgent: false,
      });
    };

    repeat(evaluate, mockEntity.length);
  });
});
