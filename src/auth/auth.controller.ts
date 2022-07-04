import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async getTest() {
    return { msg: 'Authentication worked' };
  }
}
