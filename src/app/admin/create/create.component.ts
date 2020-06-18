import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Post } from '@shared/interfaces/post.interface';

import { PostService } from '@shared/post.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent implements OnInit {

	form: FormGroup;

	constructor(private _postService: PostService) {
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			author: new FormControl(null, [Validators.required]),
			text: new FormControl(null, [Validators.required]),
			title: new FormControl(null, [Validators.required]),
		});
	}

	submit(): void {
		if (this.form.invalid) {
			return;
		}

		const post: Post = {
			author: this.form.value.author,
			date: new Date(),
			title: this.form.value.title,
			text: this.form.value.text,
		};

		this._postService.create(post).subscribe(
			() => {
				this.form.reset();
			},
		);
	}
}
