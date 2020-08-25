import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { Post } from './list.component';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-view',
  template: `
    <app-loading *ngIf="loading"></app-loading>
    <article class="post" *ngIf="!loading && post">
      <div class="anchor"></div>
      <h2>{{ post?.title }} <fa-icon [icon]="close" (click)="closePost()"></fa-icon></h2>
      <markdown [data]="post?.post" ngPreserveWhitespaces></markdown>
    </article>

    <a *ngIf="windowScrolled" (click)="scrollUp()">
      <span class="scroller"> <</span>
    </a>
  `,
  styles: [
    `
    article.post {
      width: 100%;
      line-height: 1.8rem;
      transition: all 1s;
      user-select: text;

      ::ng-deep pre,code {
        overflow: auto !important;
      }

      fa-icon{
        float: right;
        
        &:hover {
          cursor: pointer;
        }
      }
    }

    fa-icon {
      float: right;
    }

    .anchor {
      position: relative;
      top: -0.83em;
      width: 20px;
      height: 30px;
      clip-path: polygon(100% 0%, 100% 50%, 100% 100%, 50% 60%, 0 100%, 0 0);
      background: aquamarine;
    }

    .scroller {
      position: fixed;
      bottom: 70px;
      right: 70px;
      font-size: 30px;
      transform: rotate(90deg);
    }
    `
  ],
})
export class PostViewComponent implements OnInit {
  post: Post;
  close = faTimes;
  loading = false;
  windowScrolled = false;

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      const event: any = val;
      if (!(event instanceof NavigationEnd)) return;

      if (String(event.url).includes(`/post/`)) {
        const strings = event.url.split('/');
        this.getPost(strings[strings.length-1]);
      }
    });
  }

  getPost(id: string) {
    this.loading = true;
    this.postService.getPostBySlug(id).subscribe(post => {
      this.post = post[0];
      this.doFakeLoading();
      this.scrollToPost();
    });
  }
  
  doFakeLoading() {
    console.log(this.loading);
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 1000);
  }

  closePost() {
    this.scrollUp();
    this.router.navigateByUrl('/');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log(window.pageYOffset);
    this.windowScrolled = window.pageYOffset > 800 ? true : false;
  }

  scrollToPost() {
    const article: HTMLElement = document.querySelector('.anchor');
    if (article) article.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollUp() {
    document.querySelector('html').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
