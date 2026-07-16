import { Injectable } from '@angular/core';

/**
 * Minimal AuthService — hardcoded login state for demo purposes.
 * Swap isLoggedIn for a real token check in a production app.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = true;

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
