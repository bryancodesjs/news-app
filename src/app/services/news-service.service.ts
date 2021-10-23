import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Posts } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private dbPath = '/posts';

  newsRef: AngularFireList<Posts>;

  constructor(private db: AngularFireDatabase) { 
    this.newsRef = db.list(this.dbPath)
  }

  getAll(): AngularFireList<Posts> {
    return this.newsRef;
  }

  create(news: Posts): any {
    return this.newsRef.push(news);
  }

  update(key: string, value: any): Promise<void>{
    return this.newsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.newsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.newsRef.remove();
  }
}
