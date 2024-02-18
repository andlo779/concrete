import { newDateWithOffset } from './date-uti';

describe('dateUtils test', () => {
  describe('GIVEN an input of 1', () => {
    const input = 1;
    describe('WHEN I calling newDateWithOffset()', () => {
      const result = newDateWithOffset(input);
      it('THEN should return a new Date object', () => {
        expect(result).toBeInstanceOf(Date);
      });
      it('THEN should return a date that is greater then now', () => {
        expect(result.getTime()).toBeGreaterThan(Date.now());
      });
      it('THEN should return a date of plus 1 day in the feature', () => {
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + 1);
        expect(result.getDate()).toBe(expectedDate.getDate());
      });
    });
  });
});
