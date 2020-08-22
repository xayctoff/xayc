import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '@admin/services/auth.service';

import { User } from '@shared/interfaces/user.interface';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	isSubmitted = false;
	message: string;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _authService: AuthService,
		private _router: Router) {
	}

	ngOnInit(): void {
		this._activatedRoute.queryParams.subscribe((params: Params) => {
			if (params.isAuthorizationRequired) {
				this.message = 'Вы должны быть авторизованы';
			} else if (params.isAuthorizationFailed) {
				this.message = 'Сессия истекла. Авторизуйтесь заново';
			}
		});

		this.form = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.minLength(6),
			]),
		});
	}

	get error$(): Subject<string> {
		return this._authService.error$;
	}

	submit(): void {
		if (this.form.invalid) {
			return;
		}

		this.isSubmitted = true;

		const user: User = {
			email: this.form.value.email,
			password: this.form.value.password,
		};

		this._authService.login(user).subscribe(
			() => {
				this.form.reset();
				this._router.navigate(['/admin', 'dashboard']);
				this.isSubmitted = false;
			}, () => {
				this.isSubmitted = false;
			},
		);
	}
}
