import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '@shared/interfaces/post.interface';

@Pipe({
	name: 'search',
})
export class SearchPipe implements PipeTransform {

	transform(posts: Post[], query = ''): Post[] {
		if (!query.trim()) {
			return posts;
		}

		return posts.filter((post: Post) => {
			return post.title.toLowerCase().includes(query.toLowerCase());
		});
	}

}
