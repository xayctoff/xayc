import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FirebaseAuthResponse } from '@shared/interfaces/firebase-auth-response.interface';
import { User } from '@shared/interfaces/user.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private _http: HttpClient) {
	}

	get token(): string {
		const expireDate: Date = new Date(localStorage.getItem('firebase-token-expire-date'));

		if (new Date() > expireDate) {
			this.logout();
			return null;
		}

		return localStorage.getItem('firebase-token');
	}

	public error$: Subject<string> = new Subject<string>();

	private static setToken(response: FirebaseAuthResponse) {
		if (response) {
			const expireDate: Date = new Date(new Date().getTime() + +response.expiresIn * 1000);
			localStorage.setItem('firebase-token', response.idToken);
			localStorage.setItem('firebase-token-expire-date', expireDate.toString());
		} else {
			localStorage.clear();
		}
	}

	private handleError(error: HttpErrorResponse): Observable<never> {
		const message: string = error.error.error;

		switch (message) {
			case 'EMAIL_NOT_FOUND':
				this.error$.next('Пользователь с таким email не найден');
				break;
			case 'INVALID_EMAIL':
				this.error$.next('Неверный email');
				break;
			case 'INVALID_PASSWORD':
				this.error$.next('Неверный пароль');
				break;
		}

		return throwError(error);
	}

	login(user: User): Observable<FirebaseAuthResponse> {
		user.returnSecureToken = true;
		return this._http
			.post<FirebaseAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				tap(AuthService.setToken),
				catchError(this.handleError.bind(this)),
			);
	}

	logout(): void {
		AuthService.setToken(null);
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

}
