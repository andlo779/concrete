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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersMapper } from './users.mapper';
import { UserResponse } from './dto/user.response';
import { CreateUserRequest } from './dto/create-user.request';
import { ChangePasswordRequest } from './dto/change-password.request';
import { Enable2faResponse } from './dto/enable-2fa.response';
import { SimpleErrorDto } from '../common/simple-error.dto';
import { MultipleErrorDto } from '../common/multiple-error.dto';

@ApiTags('Users')
@ApiConsumes('application/json')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: SimpleErrorDto })
@ApiInternalServerErrorResponse({
  type: SimpleErrorDto,
})
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: UserResponse })
  @ApiBadRequestResponse({ type: MultipleErrorDto })
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
  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersService.getAll();
    return users.map(UsersMapper.domainToDto);
  }

  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({
    type: SimpleErrorDto,
    description: 'No user with given username exists.',
  })
  @Get(':userid')
  async getUser(@Param('userid') userid: string): Promise<UserResponse> {
    const user = await this.usersService.findWithId(userid);
    return UsersMapper.domainToDto(user);
  }

  @ApiNoContentResponse({
    description: 'Password have been updated successfully.',
  })
  @ApiForbiddenResponse({
    type: SimpleErrorDto,
    description:
      'If old password is not correct, this will be sent as response.',
  })
  @ApiBadRequestResponse({ type: MultipleErrorDto })
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
  @ApiNotFoundResponse({ type: SimpleErrorDto })
  @ApiForbiddenResponse()
  @Get(':userId/generate2fa')
  async generateTwoFactorAuth(
    @Param('userId') userId: string,
  ): Promise<Enable2faResponse> {
    return await this.usersService.generateTwoFactorAuth(userId);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: SimpleErrorDto })
  @ApiForbiddenResponse({ type: SimpleErrorDto })
  @Patch(':userId/enable2fa/:token')
  async enableTwoFactorAuth(
    @Param('userId') userId: string,
    @Param('token') token: string,
  ): Promise<any> {
    await this.usersService.validateAndEnableTwoFactorAuth(userId, token);
    return Promise.resolve();
  }

  @ApiNoContentResponse()
  @ApiForbiddenResponse({ type: SimpleErrorDto })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':userId/disable2fa')
  async disableTwoFactorAuth(@Param('userId') userId: string): Promise<any> {
    await this.usersService.disableTwoFactorAuth(userId);
    return Promise.resolve();
  }
}
