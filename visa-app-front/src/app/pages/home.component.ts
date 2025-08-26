import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from "@angular/material/sidenav";
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {


constructor(private router: Router, private viewportScroller: ViewportScroller) {}


scrollToAbout() {
  if (this.router.url === '/') {
    // Already on home page — just scroll
    this.viewportScroller.scrollToAnchor('about');
  } else {
    // Navigate to home and scroll after navigation
    this.router.navigate(['/'], { fragment: 'about' });
  }
}




countries = [
  { name: 'Australia', image: 'Australia.webp',  description: 'Fast and streamlined student and work visa process.'},
  { name: 'Canada', image: 'canada.jpg', description: 'Permanent residence and study permits made easy.'},
  { name: 'Russia', image: 'russia.jpg',description: 'Tourist and business visas with minimal documentation.' },
  { name: 'USA', image: 'usa.png', description: 'Comprehensive support for F1, B1/B2, and H1B visas.' },
];


 



}





