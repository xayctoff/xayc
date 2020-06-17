import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './shared/services/auth.service';

@NgModule({
	declarations: [
		LoginComponent,
		CreateComponent,
		EditComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
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
		SharedModule,
	],
	exports: [
		RouterModule,
	],
	providers: [
		AuthService,
	],
})
export class AdminModule {

}
