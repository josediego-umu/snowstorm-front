import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { authService } from '../auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private _authService: authService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }
        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && !request.url.includes('/login') && error.status === 401) {
                    this._authService.logout();                  
                }
                throw error;
            })
        );
    }


}
