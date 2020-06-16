import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../../../shared/interfaces';

@Injectable()
export class AuthService {

	constructor(private _http: HttpClient) {
	}

	get token(): string {
		return 'token';
	}

	login(user: User): Observable<User> {
		return this._http.post<User>('', user);
	}

	logout(): void {

	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private setToken() {

	}

}
