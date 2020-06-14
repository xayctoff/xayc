import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminLayoutComponent } from './admin/shared/components/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';

@NgModule({
	declarations: [
		AdminLayoutComponent,
		AppComponent,
		HomeComponent,
		MainLayoutComponent,
		PostComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
}
