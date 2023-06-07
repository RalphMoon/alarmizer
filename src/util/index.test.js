import { describe, expect, it } from 'vitest';
import { padToString, formatLocalDate } from '.';

describe('utility function unit test: formatLocalDate', () => {
  it('should match up with UTC', () => {
    const getWithoutMillis = function (dateString) {
      return dateString.split('.')[0];
    };
    const formatted = getWithoutMillis(formatLocalDate());
    const coordinated = getWithoutMillis(new Date().toISOString());

    const getNumericHours = function (dateString) {
      const dateTime = [...dateString];
      const tIndex = dateTime.indexOf('T');

      return Number(dateTime.slice(tIndex + 1, tIndex + 3).join(''));
    };
    const localize = function (ISOString) {
      const dateTime = [...ISOString];
      const tIndex = dateTime.indexOf('T');

      const formattedHours = getNumericHours(formatted);
      const universalHours = getNumericHours(ISOString);
      const localizedHours = padToString(
        universalHours + Math.abs(formattedHours - universalHours)
      );

      dateTime.splice(tIndex + 1, 2, localizedHours[0], localizedHours[1]);

      return dateTime.join('');
    };

    expect(formatted).toEqual(localize(coordinated));
  });
});
