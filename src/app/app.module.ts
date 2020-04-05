import { PostService } from './services/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    AboutComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MarkdownModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    LocalStorageService,
    MarkdownService,
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
