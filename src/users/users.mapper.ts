import { User } from './model/user.model';
import { UserResponse } from './dto/user.response';
import { Document } from 'mongodb';

export class UsersMapper {
  static domainToDto(user: User): UserResponse {
    const userDto = new UserResponse();
    userDto.id = user.userId;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.twoFactorAuthEnabled = user.twoFactorAuthEnabled;
    return userDto;
  }

  static documentToModel(doc: Document): User {
    const user = new User();
    user.userId = doc.userId;
    user.name = doc.name;
    user.email = doc.email;
    user.password = doc.password;
    user.twoFactorAuthSecret = doc.twoFactorAuthSecret;
    if (doc.twoFactorAuthEnabled) {
      user.twoFactorAuthEnabled = doc.twoFactorAuthEnabled;
    }
    user.createdAt = doc.createdAt;
    return user;
  }
}
