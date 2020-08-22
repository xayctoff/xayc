import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Alert, AlertService } from '@admin/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.sass'],
})
export class AlertComponent implements OnInit, OnDestroy {

	@Input() delay = 5000;

	private _subscription: Subscription = new Subscription();

	public text: string;
	public type = 'success';

	constructor(private _alertService: AlertService) {
	}

	ngOnInit(): void {
		this._subscription = this._alertService.alert$.subscribe(
			(alert: Alert) => {
				this.text = alert.text;
				this.type = alert.type;

				const timeout = setTimeout(() => {
					clearTimeout(timeout);
					this.text = '';
				}, this.delay);
			},
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
