import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log(error);
        if (error?.original?.code === '23505')
          throw new ForbiddenException('Credentials has already been taken...');
        if (error?.original?.code === '23503')
          throw new NotFoundException(error?.original?.detail);
        return throwError(() => error);
      }),
    );
  }
}
