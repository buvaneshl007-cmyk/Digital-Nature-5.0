import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';

/**
 * EnrollmentService keeps a simple in-memory list of enrolled course IDs and
 * demonstrates injecting one service into another (CourseService), building a
 * layered architecture similar to a backend service layer.
 */
@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private courseService = inject(CourseService);
  private http = inject(HttpClient);

  private enrolledCourseIds: number[] = [];

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    // In a real app this would filter server data; kept simple/synchronous
    // here for the profile page demo.
    return [];
  }

  /**
   * switchMap cancels the previous inner Observable (the "students for the
   * previously selected course" request) the moment a new courseId arrives,
   * so an old, slow response can never overwrite a newer selection.
   */
  getStudentsByCourse(courseId$: Observable<number>): Observable<Student[]> {
    return courseId$.pipe(
      switchMap((courseId) =>
        this.http.get<Student[]>(`http://localhost:3000/enrollments?courseId=${courseId}`)
      )
    );
  }
}
