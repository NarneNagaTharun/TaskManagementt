import { Component, inject, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  authService: AuthService = inject(AuthService);
  isLoggedIn: boolean = false;
  userSubject: Subscription;

  ngOnInit(){
    this.userSubject = this.authService.userEmitter.subscribe(
      (user)=>{this.isLoggedIn = user ? true : false}
    )
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }
}
