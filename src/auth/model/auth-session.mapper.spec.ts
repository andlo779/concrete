import { deserialize, serialize } from 'bson';
import { AuthSession } from './auth-session.model';
import { AuthSessionMapper } from './auth-session.mapper';

describe('AuthSessionMapper test', () => {
  function generateAuthSession(): AuthSession {
    return new AuthSession('userId', 2, 'testId', new Date());
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
