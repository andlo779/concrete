import {
  Controller,
  UseGuards,
  Request,
  Get,
  Logger,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { TokenResponse } from './dto/token.response';
import { NextStepResponse } from './dto/next-step.response';
import { TotpAuthGuard } from '../guards/totp-auth.guard';
import { JwtRefreshAuthGuard } from '../guards/jwt_refresh-auth.guard';
import { SimpleErrorDto } from '../../common/simple-error.dto';
import { RequestWithUser } from '../model/request-with-user.model';

@ApiTags('Auth')
@Controller('/auth')
@ApiExtraModels(TokenResponse, NextStepResponse)
export class AuthController {
  logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Endpoint to get a new JWT token with BASIC authentication.',
  })
  @ApiBasicAuth()
  @ApiOkResponse({
    schema: {
      title: 'TokenResponse',
      oneOf: [
        {
          $ref: getSchemaPath(NextStepResponse),
          title: 'NextStepResponse',
        },
        { $ref: getSchemaPath(TokenResponse), title: 'TokenResponse' },
      ],
    },
  })
  @ApiUnauthorizedResponse({ type: SimpleErrorDto })
  @UseGuards(AuthGuard('basic'))
  @Get('/token')
  async getToken(
    @Request() req: RequestWithUser,
  ): Promise<TokenResponse | NextStepResponse> {
    this.logger.debug(JSON.stringify(req.user));

    return this.authService.handleTokenRequest(req.user.userId);
  }

  @ApiOperation({
    description: 'Endpoint to get an new JWT token with 2FA authentication.',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokenResponse })
  @ApiUnauthorizedResponse({ type: SimpleErrorDto })
  @UseGuards(TotpAuthGuard)
  @Get('/auth-session/:authSessionId/token')
  async getTokenWith2fa(
    @Request() req: RequestWithUser,
    @Param('authSessionId') authSessionId: string,
  ): Promise<TokenResponse> {
    return this.authService.handle2faTokenRequest(
      req.user.userId,
      authSessionId,
    );
  }

  @ApiOperation({
    description: 'Endpoint to get an new JWT from a refresh token.',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokenResponse })
  @ApiUnauthorizedResponse({ type: SimpleErrorDto })
  @UseGuards(JwtRefreshAuthGuard)
  @Get('/token/refresh')
  async getTokenWithRefreshToken(
    @Request() req: RequestWithUser,
  ): Promise<TokenResponse> {
    return await this.authService.handleRefreshTokenRequest(
      req.user.userId,
      req.user.tokenId,
    );
  }
}
