import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getOne(username: string): Promise<User> {
    const result = await this.usersRepository.findOneByUserName(username);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async getAll(): Promise<any[]> {
    return await this.usersRepository.findAll();
  }

  async create(user: User): Promise<User> {
    return await this.usersRepository.insert(user);
  }
}
