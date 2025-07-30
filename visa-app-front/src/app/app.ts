import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

import { MatCardModule } from '@angular/material/card';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  this.authService.checkTokenAndLogoutIfExpired();
}



  ngOnInit() {
    this.authService.startIdleMonitor();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.router.routerState.snapshot.root.fragment;
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
  }






  
}