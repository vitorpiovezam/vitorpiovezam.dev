import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  template: `
    <p>
      post works!
    </p>
  `,
  styles: []
})
export class PostComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.getLastPosts().subscribe(x => console.log(x));
  }

}

export interface Post {
  slug: string;
  title: string;
  type: string;
  post: any;
  postDate: Date;
}
