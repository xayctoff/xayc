import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@admin/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private _authService: AuthService, private _router: Router) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this._authService.isAuthenticated()) {
			request = request.clone({
				setParams: {
					auth: this._authService.token,
				},
			});

			return next.handle(request)
				.pipe(
					catchError((error: HttpErrorResponse) => {
						if (error.status === 401) {
							this._authService.logout();
							this._router.navigate(['/admin', 'login'], {
								queryParams: {
									isAuthorizationFailed: true,
								},
							});
						}

						return throwError(error);
					}),
				);
		}
	}

}
