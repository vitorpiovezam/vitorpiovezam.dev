import { Component, OnInit, ViewChild, HostListener, Inject, InjectionToken } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  template: `
  <div class="container">
    <div>
      <h2>My latest posts</h2>
      <main>
        <ul class="posts">
          <li *ngFor="let post of posts">
            <a href="#post" (click)="selectPost(post)">
              <div class="card">
                <h3>{{ post.title }}</h3>
                <p>{{ post.textPreview }}</p>
                <span class="chip">{{ post.type }}</span>
              </div>
            </a>
          </li>
        </ul>
      </main>
    </div>
    
    <article id="post" class="post" >
      <h2>{{ selectedPost?.title }}</h2>
      <markdown [data]="selectedPost?.post"></markdown>
    </article>

    <a *ngIf="windowScrolled" (click)="scrollUp()">
    <span class="scroller"> <</span>
  </a>
  </div>
  `,
  styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  types: string[] = [];

  selectedPost: Post = null;
  windowScrolled = false;
  close = faTimes;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.postService.getLastPosts().subscribe(posts => { 
      this.posts = posts;
      this.types = this.posts.map(post => post.type);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.windowScrolled = window.pageYOffset > 250 ? true : false;
  }

  scrollUp() {
    document.querySelector('html').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  selectPost(post: Post) {
    this.selectedPost = post;
  }
}

export interface Post {
  slug: string;
  title: string;
  type: string;
  post: any;
  postDate: Date;
}
