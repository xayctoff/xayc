import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '@shared/interfaces/post.interface';
import { PostService } from '@shared/post.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

	posts$: Observable<Post[]>;

	constructor(private _postsService: PostService) {
	}

	ngOnInit(): void {
		this.posts$ = this._postsService.getAll();
	}

}
