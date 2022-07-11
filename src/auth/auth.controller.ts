import { Controller, UseGuards, Request, Get, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { TokenResponse } from './token.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @ApiProperty({ description: 'Endpoint to get an new JWT token.' })
  @ApiBasicAuth()
  @ApiOkResponse({ type: TokenResponse })
  @UseGuards(AuthGuard('basic'))
  @Get('/token')
  async token(@Request() req): Promise<TokenResponse> {
    return this.authService.login(req.user);
  }
}
