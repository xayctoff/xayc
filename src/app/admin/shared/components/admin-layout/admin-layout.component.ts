import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@admin/services/auth.service';

@Component({
	selector: 'app-admin-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.sass'],
})
export class AdminLayoutComponent implements OnInit {

	constructor(private _authService: AuthService, private _router: Router) {
	}

	ngOnInit(): void {
	}

	get isAuthenticated(): boolean {
		return this._authService.isAuthenticated();
	}

	logout(event: Event): void {
		event.preventDefault();
		this._authService.logout();
		this._router.navigate(['/admin', 'login']);
	}
}
