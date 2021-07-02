import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Set current user when user is logging ( Keep data user when reload browser )
    let user = localStorage.getItem('User');
    if(user != null) {
      this.authService.user = JSON.parse(user);
    }
  }
}
