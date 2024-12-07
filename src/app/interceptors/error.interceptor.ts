import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoggerService, LogLevel } from '../services/logger.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loggerService = inject(LoggerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        router.navigateByUrl('/error', { skipLocationChange: true });
      }
      loggerService.writeToLog('Invalid job ID', LogLevel.ERROR);
      return throwError(() => new Error('Expected resource could not be found'));
    })
  )
};
