import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		LoginComponent,
		CreateComponent,
		EditComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '', component: AdminLayoutComponent, children: [
					{
						path: '', redirectTo: '/admin/login', pathMatch: 'full',
					},
					{
						path: 'create', component: CreateComponent,
					},
					{
						path: 'dashboard', component: DashboardComponent,
					},
					{
						path: 'post/:id/edit', component: EditComponent,
					},
					{
						path: 'login', component: LoginComponent,
					},
				],
			},
		]),
	],
	exports: [
		RouterModule,
	],
})
export class AdminModule {

}
