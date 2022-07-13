import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);
  private saltRounds = 10;
  constructor(private readonly usersRepository: UsersRepository) {}

  async findWithUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findWithId(id: string): Promise<User> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const user = new User();
    user.userId = randomUUID();
    user.name = username;
    user.email = email;
    user.password = await this.hashPassword(password);
    user.createdAt = new Date();
    return await this.usersRepository.insert(user);
  }

  async changePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersRepository.findOneById(username);
    if (!user) {
      throw new NotFoundException();
    }
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new ForbiddenException();
    }
    user.password = await this.hashPassword(newPassword);
    const result = this.usersRepository.update(user);
    if (!result) {
      throw new InternalServerErrorException();
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
