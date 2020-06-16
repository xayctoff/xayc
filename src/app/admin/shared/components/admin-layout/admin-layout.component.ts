import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.sass'],
})
export class AdminLayoutComponent implements OnInit {

	constructor(private _router: Router) {
	}

	ngOnInit(): void {
	}

	logout($event: Event): void {
		$event.preventDefault();
		this._router.navigate(['/admin', 'login']);
	}
}
