import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '@admin/services/alert.service';
import { PostService } from '@shared/post.service';

import { Post } from '@shared/interfaces/post.interface';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit, OnDestroy {

	posts: Post[] = [];
	private _subscription: Subscription = new Subscription();
	query: string;

	constructor(
		private _alertService: AlertService,
		private _postsService: PostService) {
	}

	ngOnInit(): void {
		this._postsService.getAll().subscribe(posts => {
			this.posts = posts;
		});
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	remove(id: string): void {
		this._subscription = this._postsService.remove(id).subscribe(
			() => {
				this.posts.filter((post: Post) => post.id !== id);
				this._alertService.success('Пост успешно удалён');
			},
		);
	}
}
