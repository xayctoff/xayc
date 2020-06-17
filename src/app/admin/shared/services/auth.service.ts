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
		return 'token';
	}

	login(user: User): Observable<FirebaseAuthResponse> {
		return this._http
			.post<FirebaseAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				tap(this.setToken)
			);
	}

	logout(): void {

	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private setToken(response: FirebaseAuthResponse) {
		console.log(response);
	}

}
