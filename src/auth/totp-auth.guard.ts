import { AuthGuard } from '@nestjs/passport';

export class TotpAuthGuard extends AuthGuard('totp') {}
