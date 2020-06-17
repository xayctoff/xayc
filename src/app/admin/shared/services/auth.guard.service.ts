import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private _authService: AuthService, private _router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this._authService.isAuthenticated()) {
			return true;
		} else {
			this._authService.logout();
			this._router.navigate(['/admin', 'login'], {
				queryParams: {
					isAuthorizationRequired: true,
				},
			});
		}
	}

}
