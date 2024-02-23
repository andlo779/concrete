import { RefreshToken } from './refresh-token.model';
import { newDateWithOffset } from '../../../shared/date-uti';

describe('RefreshToken test', () => {
  describe('GIVEN a valid input of userId and expirationDate', () => {
    const userId = 'userId';
    const expirationDate = newDateWithOffset(1);
    describe('WHEN calling constructor', () => {
      const result = new RefreshToken(userId, expirationDate);
      it('THEN should return a RefreshToken', () => {
        expect(result).toBeInstanceOf(RefreshToken);
      });
      it('THEN new refreshToken have generated id', () => {
        expect(result.id).not.toBeNull();
      });
      it('THEN new createdAt is the same as updatedAt', () => {
        expect(result.createdAt).toStrictEqual(result.updatedAt);
      });
    });
  });

  describe('GIVEN input with userId, token and expirationDate + id, createdAt and updatedAt', () => {
    const userId = 'userId';
    const token = 'token';
    const expirationDate = newDateWithOffset(1);
    const id = 'id';
    const createdAt = new Date();
    const updatedAt = new Date(Date.now() + 2 * (60 * 60 * 1000));
    describe('WHEN calling constructor', () => {
      const result = new RefreshToken(
        userId,
        expirationDate,
        token,
        id,
        createdAt,
        updatedAt,
      );
      it('THEN should return a RefreshToken', () => {
        expect(result).toBeInstanceOf(RefreshToken);
      });
      it('THEN generated RefreshToken has provided id', () => {
        expect(result.id).toBe(id);
      });
      it('THEN new createdAt is NOT the same as updatedAt', () => {
        expect(result.createdAt).not.toStrictEqual(result.updatedAt);
      });
    });
  });
});
