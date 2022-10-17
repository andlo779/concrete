import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { isObject, isString } from '@nestjs/common/utils/shared.utils';
import { SimpleErrorDto } from './common/simple-error.dto';
import { ERROR_MSG_INTERNAL_SERVER_ERROR } from './constants';
import { MultipleErrorDto } from './common/multiple-error.dto';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionHandler');
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus: number;
    let responseBody;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const res = exception.getResponse();
      if (isObject(res)) {
        responseBody = new MultipleErrorDto(
          httpStatus,
          (
            res as {
              statusCode: number;
              message: string[];
              error: string;
            }
          ).message,
        );
      } else if (isString(res)) {
        responseBody = new SimpleErrorDto(httpStatus, res);
      }
      this.logger.debug(exception);
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = ERROR_MSG_INTERNAL_SERVER_ERROR;
      this.logger.error(exception, exception.stack);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
