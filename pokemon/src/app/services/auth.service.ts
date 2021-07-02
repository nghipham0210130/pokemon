import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn: Boolean = false;
  user!: User;

  constructor() {}

  login(model: any) {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('User');
    // Enter account with name = Lisa, password = 123456 to login
    if (model.name != "Lisa") {
      console.log("Username error");
      return false;
    }
    if (model.password != "123456") {
      console.log("Password error");
      return false;
    }
    // Create temp user to get data from model
    const tempUser = {
     name: model.name,
     likes: 0,
     dislikes: 0,
    };
    // Set data for user
    this.user = tempUser;
    // Set status login for user in localStorage
    localStorage.setItem('loginStatus', '1');
    // Set data for user in localStorage
    // Check status loggin of User follow data from localStorage
    this.checkLoginStatus();
    localStorage.setItem('User', JSON.stringify(this.user));
    return true;
  }

  // Check status login
  checkLoginStatus() {
    var loginCookie = localStorage.getItem('loginStatus');
    if (loginCookie == "1") {
      this.isLoggedIn = true;
    }
    else if( loginCookie == null ) {
      this.isLoggedIn = false;
    }
  }

  // Count likes
  countLikes() {
    if (this.user) {
      this.user.likes++;
      localStorage.setItem('User', JSON.stringify(this.user));
      console.log(localStorage.getItem('User'));
    }
  }

  // Count Dislikes
  countDislikes() {
    if (this.user) {
      this.user.dislikes++;
      localStorage.setItem('User', JSON.stringify(this.user));
      console.log(localStorage.getItem('User'));
    }
  }
}
