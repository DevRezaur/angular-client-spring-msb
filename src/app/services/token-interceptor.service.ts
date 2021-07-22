import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.authService.getToken();

    if (token) request = this.addToken(request, token);

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (error.error) {
            if (error.error.code === 'auth-001') {
              this.authService.logout();
              return throwError({
                status: '401',
                error: 'Invalid credentials!',
              });
            } else if (error.error.code === 'auth-002') {
              this.authService.logout();
              return throwError({
                status: '401',
                error: 'You need to login first!',
              });
            }
          }
          return this.handle401Error(request, next);
        }

        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.accessToken);
          return next.handle(this.addToken(request, response.accessToken));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
