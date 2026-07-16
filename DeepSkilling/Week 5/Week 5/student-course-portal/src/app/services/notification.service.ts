import { Injectable } from '@angular/core';

/**
 * NotificationService is NOT provided in root. It is provided at the
 * NotificationComponent level (see notification.component.ts `providers`
 * array), so Angular creates a new, separate instance scoped to that
 * component (and its children) rather than sharing the app-wide singleton.
 * This is useful when each usage needs isolated state.
 */
@Injectable()
export class NotificationService {
  private messages: string[] = [];

  push(message: string): void {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages = [];
  }
}
