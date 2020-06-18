import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from '@admin/components/admin-layout/admin-layout.component';
import { CreateComponent } from '@admin/create.component';
import { DashboardComponent } from '@admin/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from '@admin/login.component';

import { SearchPipe } from '@admin/pipes/search.pipe';

import { AuthGuard } from '@admin/services/auth.guard.service';

@NgModule({
	declarations: [
		CreateComponent,
		DashboardComponent,
		EditComponent,
		LoginComponent,
		SearchPipe,
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
						path: 'create', component: CreateComponent, canActivate: [AuthGuard],
					},
					{
						path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
					},
					{
						path: 'post/:id/edit', component: EditComponent, canActivate: [AuthGuard],
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
		AuthGuard,
	],
})
export class AdminModule {

}
