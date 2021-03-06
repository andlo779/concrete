import {
  Controller,
  UseGuards,
  Request,
  Get,
  Logger,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { TokenResponse } from './dto/token.response';
import { NextStepResponse } from './dto/next-step.response';
import { TotpAuthGuard } from './totp-auth.guard';

@ApiTags('auth')
@Controller('auth')
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
  @UseGuards(AuthGuard('basic'))
  @Get('/token')
  async getToken(@Request() req): Promise<TokenResponse | NextStepResponse> {
    return this.authService.handleTokenRequest(req.user);
  }

  @ApiOperation({
    description: 'Endpoint to get an new JWT token with 2FA authentication.',
  })
  @ApiOkResponse({ type: TokenResponse })
  @ApiBearerAuth()
  @UseGuards(TotpAuthGuard)
  @Get('/authSession/:authSessionId/token')
  async getTokenWith2fa(
    @Request() req,
    @Param('authSessionId') authSessionId: string,
  ): Promise<TokenResponse> {
    return this.authService.handle2faTokenRequest(req.user, authSessionId);
  }
}
