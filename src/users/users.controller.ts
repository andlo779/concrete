import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(): Promise<User> {
    const user = new User();
    user.userId = '666';
    user.name = 'patrik';
    user.password = '123456789';
    user.email = 'patrik.toy@climatepartner.com';
    user.createdAt = new Date();

    return await this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    return this.usersService.getOne(username);
  }
}
