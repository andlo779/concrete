import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserMapper } from './user.mapper';
import { UserResponse } from './dto/user.response';
import { CreateUserRequest } from './dto/create-user.request';
import { ChangePasswordRequest } from './dto/change-password.request';

@ApiTags('users')
@ApiConsumes('application/json')
@Controller('users')
export class UsersController {
  logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserResponse })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() body: CreateUserRequest): Promise<UserResponse> {
    const user = await this.usersService.create(
      body.name,
      body.email,
      body.password,
    );
    return UserMapper.domainToDto(user);
  }

  @ApiOkResponse({ type: UserResponse, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersService.getAll();
    return users.map(UserMapper.domainToDto);
  }

  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({ description: 'No user with given username exists.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<UserResponse> {
    const user = await this.usersService.getOne(username);
    return UserMapper.domainToDto(user);
  }

  @ApiOkResponse({ description: 'Password have been updated successfully.' })
  @ApiNotFoundResponse({ description: 'No user with given username exists.' })
  @ApiForbiddenResponse({
    description:
      'If old password is not correct, this will be sent as response.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':username/password')
  async changePassword(
    @Param('username') username: string,
    @Body() body: ChangePasswordRequest,
  ): Promise<any> {
    await this.usersService.changePassword(
      username,
      body.oldPassword,
      body.newPassword,
    );
    return Promise.resolve();
  }
}
