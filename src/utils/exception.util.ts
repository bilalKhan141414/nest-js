import { HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

export const sendCustomExceptionResponse = (
  exception: unknown,
  host: ArgumentsHost,
  httpAdapter: any,
  message?: string,
  status?: number,
) => {
  const ctx = host.switchToHttp();

  const httpStatus =
    status ??
    (exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR);

  const responseBody = {
    statusCode: httpStatus,
    timestamp: new Date().toISOString(),
    path: httpAdapter.getRequestUrl(ctx.getRequest()),
    message,
  };

  httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
};
