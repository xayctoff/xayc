import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
	{
		path: '', component: MainLayoutComponent, children: [
			{
				path: '', redirectTo: '/', pathMatch: 'full',
			},
			{
				path: '', component: HomeComponent,
			},
			{
				path: 'posts/:id', component: PostsComponent,
			},
		],
	},
	{
		path: 'admin', loadChildren: './admin/admin.module#AdminModule',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		preloadingStrategy: PreloadAllModules,
	})],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
