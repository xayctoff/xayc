import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
	text: string;
	type: AlertType;
}

@Injectable()
export class AlertService {

	public alert$: Subject<Alert> = new Subject<Alert>();

	danger(text: string): void {
		this.alert$.next({text, type: 'danger'});
	}

	success(text: string): void {
		this.alert$.next({text, type: 'success'});
	}

	warning(text: string): void {
		this.alert$.next({text, type: 'warning'});
	}

}
