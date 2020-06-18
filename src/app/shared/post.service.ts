import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '@shared/interfaces/post.interface';
import { FirebaseCreateResponse } from '@shared/interfaces/firebase-create-response.interface';

@Injectable({
	providedIn: 'root',
})
export class PostService {

	constructor(private _http: HttpClient) {
	}

	create(post: Post): Observable<Post> {
		return this._http.post(`${environment.firebaseDatabaseUrl}/posts.json`, post)
			.pipe(map((response: FirebaseCreateResponse) => {
					return {
						...post,
						id: response.name,
						date: new Date(post.date),
					};
				},
				),
			);
	}

}
