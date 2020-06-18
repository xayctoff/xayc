import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { PostService } from '@shared/post.service';

import { Post } from '@shared/interfaces/post.interface';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass'],
})
export class EditComponent implements OnInit {

	form: FormGroup;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _postsService: PostService) {
	}

	ngOnInit(): void {
		this._activatedRoute.params.pipe(
			switchMap((params: Params) => {
				return this._postsService.getById(params.id);
			}),
		).subscribe((post: Post) => {
			this.form = new FormGroup({
				title: new FormControl(post.title, Validators.required),
				text: new FormControl(post.text, Validators.required),
			});
		});
	}

	submit(): void {

	}
}
