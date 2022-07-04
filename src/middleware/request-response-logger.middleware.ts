import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestResponseLoggerMiddleware implements NestMiddleware {
  private _logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { ip, method, originalUrl, hostname } = request;
    const userAgent = request.get('user-agent') || '';

    this._logger.log(
      `Request: {method: ${method}, url: ${originalUrl}, hostname: ${hostname}, remoteAddress: ${ip}, userAgent: ${userAgent}}, Message: Incoming request}`,
    );

    response.on('finish', () => {
      const { statusCode } = response;
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      this._logger.log(
        `Response: {statusCode: ${statusCode}, responseTime: ${responseTime.toFixed(
          2,
        )}ms, Message: Request completed}`,
      );
    });
    next();
  }
}
