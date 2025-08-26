import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class NotificationComponent implements OnInit {
  pendingNotifications$!: Observable<any[]>;

  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.pendingNotifications$ = this.notificationService.notifications$.pipe(
      map(notes => notes.filter(note => note.message.includes('awaiting review')))
    );
  }

  getIcon(type: string): string {
    switch (type) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }

  remove(note: any): void {
    this.notificationService.remove(note);
  }
}