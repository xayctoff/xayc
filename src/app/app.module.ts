import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from '@admin/components/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from '@shared/components/main-layout/main-layout.component';
import { HomeComponent } from '@home/home.component';
import { PostComponent } from '@shared/components/post/post.component';
import { PostPageComponent } from '@post-page/post-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@shared/auth.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
	provide: HTTP_INTERCEPTORS,
	multi: true,
	useClass: AuthInterceptor,
};

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
	providers: [INTERCEPTOR_PROVIDER],
	bootstrap: [AppComponent],
})
export class AppModule {
}
