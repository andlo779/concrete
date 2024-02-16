import { RefreshToken } from './refresh-token.model';

describe('RefreshToken test', () => {
  describe('GIVEN input with userId token and ttl', () => {
    const userId = 'userId';
    const token = 'token';
    const ttl = 1000;
    describe('WHEN calling constructor', () => {
      const result = new RefreshToken(userId, token, ttl);
      it('THEN should return a RefreshToken', () => {
        expect(result).toBeInstanceOf(RefreshToken);
      });
      it('THEN new refreshToken have generated id', () => {
        expect(result.xxid).not.toBeNull();
      });
      it('THEN new createdAt is the same as updatedAt', () => {
        expect(result.createdAt).toStrictEqual(result.updatedAt);
      });
    });
  });

  describe('GIVEN input with userId token and ttl + id, createdAt and updatedAt', () => {
    const userId = 'userId';
    const token = 'token';
    const ttl = 1000;
    const id = 'id';
    const createdAt = new Date();
    const updatedAt = new Date(Date.now() + 2 * (60 * 60 * 1000));
    describe('WHEN calling constructor', () => {
      const result = new RefreshToken(
        userId,
        token,
        ttl,
        id,
        createdAt,
        updatedAt,
      );
      it('THEN should return a RefreshToken', () => {
        expect(result).toBeInstanceOf(RefreshToken);
      });
      it('THEN generated RefreshToken has provided id', () => {
        expect(result.xxid).toBe(id);
      });
      it('THEN new createdAt is NOT the same as updatedAt', () => {
        expect(result.createdAt).not.toStrictEqual(result.updatedAt);
      });
    });
  });
});
