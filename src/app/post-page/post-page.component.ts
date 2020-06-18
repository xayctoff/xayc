import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PostService } from '@shared/post.service';

import { Post } from '@shared/interfaces/post.interface';

@Component({
	selector: 'app-post-page',
	templateUrl: './post-page.component.html',
	styleUrls: ['./post-page.component.sass'],
})
export class PostPageComponent implements OnInit {

	post$: Observable<Post>;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _postsService: PostService) {
	}

	ngOnInit(): void {
		this.post$ = this._activatedRoute.params.pipe(
			switchMap((params: Params) => {
				return this._postsService.getById(params.id);
			}),
		);
	}

}
