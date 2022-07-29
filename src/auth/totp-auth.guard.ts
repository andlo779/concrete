import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Todo: test if this really need to be injectable? Not being set up in any module..
@Injectable()
export class TotpAuthGuard extends AuthGuard('totp') {}
