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

pushPendingApplications(applications: any[]): void {
  const pendingApps = applications.filter(app => app.status === 'Pending');

  pendingApps.forEach(app => {
    this.push(`Application #${app.id} (${app.applicantName}) is awaiting review`, 'warning');
  });
}

  clear(): void {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }

  remove(note: any): void {
    this.notifications = this.notifications.filter(n => n !== note);
    this.notificationsSubject.next(this.notifications);
  }
}