import { Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { PingException } from './ping.exception';

@Catch(PingException)
export class PingExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PingExceptionFilter.name);

  catch(exception: PingException): void {
    this.logger.log(exception instanceof PingException);
    this.logger.log(exception.message);
  }
}
