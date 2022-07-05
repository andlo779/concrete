import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);
  private saltRounds = 10;
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
    user.password = await this.hashPassword(user.password);
    return await this.usersRepository.insert(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
