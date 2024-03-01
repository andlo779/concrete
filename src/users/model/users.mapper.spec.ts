import { User } from './user.model';
import { deserialize, serialize } from 'bson';
import { UsersMapper } from './users.mapper';

describe('UsersMapper', () => {
  function generateUser(): User {
    const user = new User();
    user.userId = 'testId';
    user.name = 'test user';
    user.email = 'test@user.com';
    user.password = 'password';
    user.twoFactorAuthSecret = 'superSecureSecret';
    user.twoFactorAuthEnabled = true;
    user.createdAt = new Date();

    return user;
  }

  describe('documentToModel()', () => {
    it('GIVEN correct document WHEN calling function THEN return User model', () => {
      const user = generateUser();
      const doc = deserialize(serialize(user));

      const result = UsersMapper.documentToModel(doc);
      expect(result).toStrictEqual(user);
    });
  });
});
