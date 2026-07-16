import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

// This routes file is dynamically imported (see app.routes.ts `loadChildren`)
// so its component code ships in a separate chunk, downloaded only when the
// user first navigates to /enroll.
export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../pages/enrollment-form/enrollment-form.component').then(
        (m) => m.EnrollmentFormComponent
      ),
  },
  {
    path: 'reactive',
    loadComponent: () =>
      import('../../pages/reactive-enrollment-form/reactive-enrollment-form.component').then(
        (m) => m.ReactiveEnrollmentFormComponent
      ),
    canDeactivate: [unsavedChangesGuard],
  },
];
