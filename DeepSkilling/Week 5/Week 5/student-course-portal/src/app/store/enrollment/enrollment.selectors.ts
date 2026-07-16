import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state) => state?.enrolledCourseIds ?? []
);

/**
 * Cross-slice selector: combines the `course` and `enrollment` feature
 * states to derive the list of fully-populated Course objects the student
 * is enrolled in, without duplicating course data inside the enrollment
 * slice.
 */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, ids) => courses.filter((c) => ids.includes(c.id))
);
