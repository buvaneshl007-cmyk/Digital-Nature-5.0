# Student Course Portal — Angular (v20) Hands-On Solution

A single Angular application built incrementally across all 10 Digital Nurture 5.0 hands-on
exercises: components & bindings, directives & pipes, template-driven & reactive forms,
services & DI, routing & guards, HttpClient & interceptors, NgRx state management, and unit
tests.

## Prerequisites

- Node.js LTS 20+ and npm
- Angular CLI v20 (`npm install -g @angular/cli`)
- Google Chrome (for `ng test`)

## Setup

```bash
cd student-course-portal
npm install
```

## Running the app

The app talks to a mock REST API (JSON Server) for course data (Hands-On 8). Run both in
separate terminals:

```bash
# Terminal 1 — mock backend on http://localhost:3000
npm run api

# Terminal 2 — Angular dev server on http://localhost:4200
npm start
```

Open http://localhost:4200.

## Running unit tests

```bash
npm test
```

Runs all `*.spec.ts` files with Karma + Jasmine (headless Chrome, see `karma.conf.js`).
For a coverage report: `npx ng test --watch=false --code-coverage` (output in `coverage/`).

## Building for production

```bash
npm run build
```

Output is written to `dist/student-course-portal`.

## Feature map (which hands-on lives where)

| Hands-On | Feature | Where |
|---|---|---|
| 1 | Project setup, first components | `notes.txt`, `components/header`, `pages/home`, `pages/course-list`, `pages/student-profile` |
| 2 | Binding types, lifecycle hooks, @Input/@Output | `pages/home`, `components/course-card`, `pages/course-list` |
| 3 | Structural/attribute directives, custom directive & pipe | `directives/highlight.directive.ts`, `pipes/credit-label.pipe.ts`, `components/course-card` |
| 4 | Template-driven form | `pages/enrollment-form` |
| 5 | Reactive form, custom validators, FormArray | `pages/reactive-enrollment-form` |
| 6 | Services & DI | `services/course.service.ts`, `services/enrollment.service.ts`, `services/notification.service.ts`, `components/notification` |
| 7 | Routing, params, guards, lazy loading | `app.routes.ts`, `features/enrollment/enrollment.routes.ts`, `guards/` |
| 8 | HttpClient, RxJS operators, interceptors | `services/course.service.ts`, `interceptors/` |
| 9 | NgRx store, actions, reducers, effects, selectors | `store/course/`, `store/enrollment/` |
| 10 | Unit tests | `*.spec.ts` files throughout |

## Notes

- All components are standalone (Angular 20 default) — no NgModules except the lazy-loaded
  enrollment routes, which are configured with `loadComponent`/`loadChildren` for code
  splitting.
- Redux DevTools (Chrome extension) will show the NgRx action stream (`[Course] ...`,
  `[Enrollment] ...`) if installed.
- `db.json` seeds the mock API with 5 courses, 2 students, and 2 enrollments.
