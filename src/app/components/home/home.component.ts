import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/news-service.service';
import { Posts } from '../../models/news.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts?: Posts[];
  currentPost: Posts = {
    title: '',
    body: '',
    coverimage: '',
    author: '',
    key: ''
  };
  currentIndex = -1;
  title = '';

  constructor(private news_service: PostsService) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  //BRING ALL POSTS FROM FIREBASE
  retrievePosts(): void {
    this.news_service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.posts = data.reverse(); 
      // the 'reverse()' function reverts the order in which the array results are shown by default
    });
  }
  //SELECT A POST
  selectPost(post: Posts, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
    console.log(post);
  }
  //OPENS THE POST READER "MODAL"
  readPost(post: Posts, index: number) {
    this.currentPost = post;
    this.currentIndex = index;
    (document.getElementById('reader') as HTMLElement).className = "d-block animate__animated animate__fadeInRight";
    console.log(post)
  }
  //CLOSE READER "MODAL"
  closePost() {
    (document.getElementById('reader') as HTMLElement).className = "d-block animate__animated animate__fadeOutRight";
    setTimeout(() => {
      (document.getElementById('reader') as HTMLElement).className = "d-none";
    },300);
  }
  //DELETE POST
  deletePost(post: Posts, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
    if (this.currentPost.key) {
      this.news_service.delete(this.currentPost.key).catch(err => console.log(err));
    }
    console.log(this.currentPost);
  }
}
