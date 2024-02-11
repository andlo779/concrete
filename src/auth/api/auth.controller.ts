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
    //ToDo: validation of userId and tokenId??
    return await this.authService.handleRefreshTokenRequest(
      req.user.userId,
      req.user.tokenId,
    );

    /*
    What is the problem? We are using the User type from the User domain model, and it does not have a tokenId property.
    It does have much other properties that should not be exposed to the outside world. So we need to create a new type
    that is only used for the token request. We can do this by creating a new DTO (Data Transfer Object) in the auth
    module. Create a new file named token.request.ts in the auth/dto folder with the following content:

    Solution:
    New user type that authorization attaches to request objects that only holds the data/properties needed.
    * UserId
    * TokenId

    If a user object exists on the request object, this means that a user is authenticated.
    Question: If we already need to fetch a user from DB during authentication, should we then return it, so we don't need
    to fetch it again? (Not all authentication need to fetch user from DB, e.g. Basic auth so the behaviour would not be consistent)

    * No returning of user object from authentication methods only the userId and tokenId
    * No returning complete refresh token but rather a hash of it and only store the hash + expiration date in the DB

     */
  }
}
