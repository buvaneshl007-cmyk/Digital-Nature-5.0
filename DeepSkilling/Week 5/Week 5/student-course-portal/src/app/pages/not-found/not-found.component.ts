import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section style="padding: 2rem; text-align: center;">
      <h2>404 — Page Not Found</h2>
      <p><a routerLink="/">Go back home</a></p>
    </section>
  `,
})
export class NotFoundComponent {}
