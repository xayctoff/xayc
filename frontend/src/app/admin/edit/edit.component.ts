import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AlertService } from '@admin/services/alert.service';
import { PostService } from '@shared/post.service';

import { Post } from '@shared/interfaces/post.interface';


@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass'],
})
export class EditComponent implements OnInit, OnDestroy {

	form: FormGroup;
	isSubmitted = false;
	post: Post;
	private _subscription: Subscription = new Subscription();

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _alertService: AlertService,
		private _postsService: PostService) {
	}

	ngOnInit(): void {
		this._activatedRoute.params.pipe(
			switchMap((params: Params) => {
				return this._postsService.getById(params.id);
			}),
		).subscribe((post: Post) => {
			this.post = post;
			this.form = new FormGroup({
				title: new FormControl(post.title, Validators.required),
				text: new FormControl(post.text, Validators.required),
			});
		});
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	submit(): void {
		if (this.form.invalid) {
			return;
		}

		this.isSubmitted = true;
		this._subscription = this._postsService.update({
			...this.post,
			text: this.form.value.text,
			title: this.form.value.title,
		}).subscribe(
			() => {
				this.isSubmitted = false;
				this._alertService.success('Пост успешно изменён');
			},
		);
	}
}
