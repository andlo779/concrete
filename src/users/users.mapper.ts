import { User } from './user.entity';
import { UserResponse } from './dto/user.response';

export class UsersMapper {
  static domainToDto(user: User): UserResponse {
    const userDto = new UserResponse();
    userDto.id = user.userId;
    userDto.name = user.name;
    userDto.email = user.email;
    return userDto;
  }

  static documentToDomain(doc: any): User {
    const user = new User();
    user._id = doc._id;
    user.userId = doc.userId;
    user.name = doc.name;
    user.email = doc.email;
    user.password = doc.password;
    user.createdAt = doc.createdAt;
    return user;
  }
}
