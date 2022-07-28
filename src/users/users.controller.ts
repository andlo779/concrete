import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersMapper } from './users.mapper';
import { UserResponse } from './dto/user.response';
import { CreateUserRequest } from './dto/create-user.request';
import { ChangePasswordRequest } from './dto/change-password.request';
import { Enable2faResponse } from './dto/enable-2fa.response';

@ApiTags('users')
@ApiConsumes('application/json')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserResponse })
  @ApiBearerAuth()
  @Post()
  async createUser(@Body() body: CreateUserRequest): Promise<UserResponse> {
    const user = await this.usersService.create(
      body.name,
      body.email,
      body.password,
    );
    return UsersMapper.domainToDto(user);
  }

  @ApiOkResponse({ type: UserResponse, isArray: true })
  @ApiBearerAuth()
  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersService.getAll();
    return users.map(UsersMapper.domainToDto);
  }

  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({
    description: 'No user with given username exists.',
  })
  @ApiBearerAuth()
  @Get(':userid')
  async getUser(@Param('userid') userid: string): Promise<UserResponse> {
    const user = await this.usersService.findWithId(userid);
    return UsersMapper.domainToDto(user);
  }

  @ApiNoContentResponse({
    description: 'Password have been updated successfully.',
  })
  @ApiNotFoundResponse({ description: 'No user with given username exists.' })
  @ApiForbiddenResponse({
    description:
      'If old password is not correct, this will be sent as response.',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':userid/password')
  async changePassword(
    @Param('userid') userId: string,
    @Body() changePasswordRequest: ChangePasswordRequest,
  ): Promise<any> {
    await this.usersService.changePassword(
      userId,
      changePasswordRequest.oldPassword,
      changePasswordRequest.newPassword,
    );
    return Promise.resolve();
  }

  @ApiOkResponse({ type: Enable2faResponse })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @Get(':userId/generate2fa')
  async generateTwoFactorAuth(
    @Param('userId') userId: string,
  ): Promise<Enable2faResponse> {
    return await this.usersService.generateTwoFactorAuth(userId);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @Get(':userId/enable2fa/:token')
  async enableTwoFactorAuth(
    @Param('userId') userId: string,
    @Param('token') token: string,
  ): Promise<any> {
    await this.usersService.validateAndEnableTwoFactorAuth(userId, token);
    return Promise.resolve();
  }

  @ApiNoContentResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get(':userId/disable2fa')
  async disableTwoFactorAuth(@Param('userId') userId: string): Promise<any> {
    await this.usersService.disableTwoFactorAuth(userId);
    return Promise.resolve();
  }
}
