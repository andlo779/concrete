import { deserialize, serialize } from 'bson';
import { AuthSession } from './model/auth-session.model';
import { AuthSessionMapper } from './auth-session.mapper';

describe('AuthSessionMapper', () => {
  function generateAuthSession(): AuthSession {
    const session = new AuthSession();
    session.id = 'testId';
    session.userId = 'userId';
    session.ttl = 2;
    session.createdAt = new Date();

    return session;
  }

  describe('documentToModel()', () => {
    it('GIVEN correct document WHEN calling function THEN return AuthSession model', () => {
      const user = generateAuthSession();
      const doc = deserialize(serialize(user));

      const result = AuthSessionMapper.documentToModel(doc);
      expect(result).toStrictEqual(user);
    });
  });
});
