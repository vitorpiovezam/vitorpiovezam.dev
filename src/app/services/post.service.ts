import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Post } from '../components/posts/posts.component';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  mock: any[] = [
    {
      id: 123123123,
      title: 'Lorem ipson',
      type: 'development',
      slug: 'FOO',
      textPreview: '23123',
      postDate: new Date(),
      text: `<iframe width="200px" height="200px" src="http://www.google.com"></iframe>`
    },
    {
      id: 123123123,
      title: 'Lorem ipson',
      type: 'development',
      text: `## SALVE`
    },
    {
      id: 123123123,
      title: 'Lorem ipson',
      type: 'music',
      text: `<iframe width="200px" height="200px" src="http://www.google.com"></iframe>`
    },
    {
      id: 123123123,
      title: 'Lorem ipson',
      type: 'development',
      text: `boolean fooo boolean fooo boolean fooo boolean foooboolean
      foooboolean fooo boolean fooo boolean fooo boolean fooo boolean fooo boolean fooo`
    }
  ];

  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getLastPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPostBySlug(slug: string) {
    return this.http.get(`${this.apiUrl}/post/${slug}`);
  }

  getPostsByType(tagName: string) {
    return this.http.get(this.apiUrl + '/lastPosts');
  }
}
