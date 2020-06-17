import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

import { User } from '../../shared/interfaces/user.interface';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	isSubmitted = false;

	constructor(private _authService: AuthService, private _router: Router) {
	}

	ngOnInit(): void {
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
			},
		);
	}
}
