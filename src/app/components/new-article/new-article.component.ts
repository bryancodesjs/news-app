import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/news.model';
import { PostsService } from 'src/app/services/news-service.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  
  post: Posts = new Posts();
  submitted = false;

  constructor(private _PostsService: PostsService) { }

  ngOnInit(): void {
  }

  savePost(): void {
    this.post.publishingdate = Date();
    this._PostsService.create(this.post).then(() => {
      console.log('News article published');
      console.log(this.post);
      this.submitted = true;
    })
    //console.log(this.post);
  }

  newPost(): void {
    this.submitted = false;
    this.post = new Posts();
  }
}
