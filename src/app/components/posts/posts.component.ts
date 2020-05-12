import { Component, OnInit, HostListener } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  template: `
  <div class="container">
    <div>
      <h2>My latest posts</h2>
      <small *ngIf="loading">Heroku container is sleppy 😴, wait here, the posts are coming!</small>
      <main>
        <ul class="posts">
          <li *ngFor="let post of posts">
            <a (click)="selectPost(post)">
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
    
    <article id="post" class="post" *ngIf="selectedPost">
      <h2>{{ selectedPost?.title }} <fa-icon [icon]="close" (click)="closePost()"></fa-icon></h2>
      <markdown [data]="selectedPost?.post" ngPreserveWhitespaces></markdown>
    </article>

    <a *ngIf="windowScrolled" (click)="scrollUpPost()">
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
  loading = true;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.postService.getLastPosts().subscribe(posts => { 
      this.posts = posts;
      this.loading = false;
      this.types = this.posts.map(post => post.type);
    });
  }

  selectPost(post: Post) {
    this.selectedPost = post;
    setTimeout(() => this.scrollUpPost(), 200);
  }

  closePost() {
    this.scrollUp();
    setTimeout(() => this.selectedPost = null, 600);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.windowScrolled = window.pageYOffset > 800 ? true : false;
  }

  scrollUpPost() {
    document.querySelector('article').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollUp() {
    document.querySelector('html').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export interface Post {
  slug: string;
  title: string;
  type: string;
  post: any;
  postDate: Date;
}
