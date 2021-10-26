import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  email: string = '';
  password: string  = '';

  constructor(public authServe: AuthService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authServe.signIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authServe.signOut();
  }

}
