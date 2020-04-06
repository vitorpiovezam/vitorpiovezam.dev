import { Component, OnInit, ViewChild, HostListener, Inject, InjectionToken } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  template: `
  <div id="top" class="container">
    <h2>My latest posts</h2>
    <main>
      <ul class="posts">
          <li *ngFor="let post of posts">
            <a [routerLink]="['/post/' + post.slug]">
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
  `,
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit {
  posts: Post[];
  types: string[] = [];

  selectedPost: Post;
  windowScrolled = false;
  close = faTimes;

  constructor(
    private postService: PostService
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
