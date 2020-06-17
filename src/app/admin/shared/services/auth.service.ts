import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User } from '../../../shared/interfaces/user.interface';
import { tap } from 'rxjs/operators';
import { FirebaseAuthResponse } from '../../../shared/interfaces/firebase-auth-response.interface';

@Injectable()
export class AuthService {

	constructor(private _http: HttpClient) {
	}

	get token(): string {
		const expireDate: Date = new Date(localStorage.getItem('firebase-token-expire-date'))

		if (new Date() > expireDate) {
			this.logout();
			return null;
		}

		return localStorage.getItem('firebase-token');
	}

	private static setToken(response: FirebaseAuthResponse) {
		if (response) {
			const expireDate: Date = new Date(new Date().getTime() + +response.expiresIn * 1000);
			localStorage.setItem('firebase-token', response.idToken);
			localStorage.setItem('firebase-token-expire-date', expireDate.toString());
		} else {
			localStorage.clear();
		}
	}

	login(user: User): Observable<FirebaseAuthResponse> {
		user.returnSecureToken = true;
		return this._http
			.post<FirebaseAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				tap(AuthService.setToken),
			);
	}

	logout(): void {
		AuthService.setToken(null);
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

}
