import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
import { sendCustomExceptionResponse } from './utils/exception.util';

@Catch()
export class CustomExceptionHandler extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const isUniqueFiledException =
      exception instanceof QueryFailedError && exception['code'] === '23505';
    console.log(
      exception instanceof QueryFailedError,
      'exception instanceof QueryFailedError',
      exception,
    );
    if (isUniqueFiledException) {
      const message = exception['detail'].replace(
        /^Key \((.*)\)=\((.*)\) (.*)/,
        'This $1 $2 already exists.',
      );
      return sendCustomExceptionResponse(
        exception,
        host,
        httpAdapter,
        message,
        HttpStatus.BAD_REQUEST,
      );
    }

    super.catch(exception, host);
  }
}
