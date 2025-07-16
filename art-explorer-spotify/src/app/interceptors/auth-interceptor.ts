import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpParams, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authObjectJson = localStorage.getItem('auth_object');
  let clonedReq = req;

  if (authObjectJson) {
    const authObject = JSON.parse(authObjectJson);
    if (authObject?.access_token) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authObject.access_token}`,
        },
      });
    }
  }

  return next(clonedReq).pipe(
    catchError(error => {
      if (
        error.status === 401 &&
        authObjectJson &&
        JSON.parse(authObjectJson).refresh_token
      ) {
        const refreshToken = JSON.parse(authObjectJson).refresh_token;
        const clientId = '6fa458202a164dcc917553462cc12ff1';

        const http = inject(HttpClient);
        const router = inject(Router);

        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        });

        const body = new HttpParams()
          .set('grant_type', 'refresh_token')
          .set('refresh_token', refreshToken)
          .set('client_id', clientId);

        return http.post<any>('https://accounts.spotify.com/api/token', body, { headers }).pipe(
          switchMap(res => {
            if (!res.refresh_token) {
              res.refresh_token = refreshToken;
            }

            localStorage.setItem('auth_object', JSON.stringify(res));

            const retriedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access_token}`,
              },
            });
            return next(retriedReq);
          }),
          catchError(() => {
            localStorage.removeItem('auth_object');
            router.navigate(['/']);
            return throwError(() => new Error('Session expired'));
          })
        );
      }
      return throwError(() => error);
    })
  );
};
