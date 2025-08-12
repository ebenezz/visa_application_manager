import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private notifications: any[] = [];

  push(message: string, type: 'info' | 'warning' | 'error' = 'info'): void {
    const notification = {
      message,
      type,
      timestamp: new Date()
    };
    this.notifications.unshift(notification);
    this.notificationsSubject.next(this.notifications);
  }

  clear(): void {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }
}