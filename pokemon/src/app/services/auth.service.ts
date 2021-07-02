// by Lisa
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn: Boolean = false;
  user!: User;
  countLikes!: number;
  countDislikes!: number;


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
     likes: this.countLikes || 0,
     dislikes: this.countDislikes || 0,
    };
    // Set data for user
    this.user = tempUser;
    // Set status login for user in localStorage
    localStorage.setItem('loginStatus', '1');
    // Set data for user in localStorage
    localStorage.setItem('User', JSON.stringify(this.user));
    // Check status loggin of User follow data from localStorage
    this.checkLoginStatus();
    return true;
  }

  checkLoginStatus() {
    var loginCookie = localStorage.getItem('loginStatus');
    if (loginCookie == "1") {
      this.isLoggedIn = true;
    }
    else if( loginCookie == null ) {
      this.isLoggedIn = false;
    }
  }
}
