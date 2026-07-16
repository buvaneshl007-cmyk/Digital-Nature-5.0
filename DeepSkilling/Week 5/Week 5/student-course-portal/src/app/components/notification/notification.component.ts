import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  // Providing NotificationService here (rather than root) gives this
  // component its own isolated instance, separate from any other
  // NotificationService instance elsewhere in the app.
  providers: [NotificationService],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  get messages(): string[] {
    return this.notificationService.getMessages();
  }

  add(message: string): void {
    this.notificationService.push(message);
  }
}
