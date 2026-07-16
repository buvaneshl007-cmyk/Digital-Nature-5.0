import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

const API_URL = 'http://localhost:3000/courses';

/**
 * CourseService — provided in root, so a single shared instance is injected
 * everywhere in the app (singleton pattern, Hands-On 6).
 *
 * Hands-On 8 replaced the original hardcoded array with real HttpClient calls
 * against a JSON Server mock backend (see db.json / npm run api).
 */
@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(API_URL).pipe(
      // tap is for side effects (logging) — it must never mutate the stream,
      // unlike map which is meant for transforming values.
      tap((courses) => console.log('Courses loaded:', courses.length)),
      map((courses) => courses.filter((c) => c.credits > 0)),
      // retry failed requests up to 2 times before giving up
      retry(2),
      catchError((err) => {
        console.error('getCourses failed', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${API_URL}/${id}`).pipe(
      catchError((err) => {
        console.error('getCourseById failed', err);
        return throwError(() => new Error('Failed to load course.'));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(API_URL, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${API_URL}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
