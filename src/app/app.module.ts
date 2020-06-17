import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AdminLayoutComponent } from './admin/shared/components/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './shared/components/post/post.component';
import { PostPageComponent } from './post-page/post-page.component';

@NgModule({
	declarations: [
		AdminLayoutComponent,
		AppComponent,
		HomeComponent,
		MainLayoutComponent,
		PostComponent,
		PostPageComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
}
