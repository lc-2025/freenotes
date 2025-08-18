import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Starting execution...');

    const now = Date.now();

    return next
      .handle()
      .pipe(tap(() => console.log(`Execution duration: ${Date.now() - now}ms`)));
  }
}

export default LoggingInterceptor;
