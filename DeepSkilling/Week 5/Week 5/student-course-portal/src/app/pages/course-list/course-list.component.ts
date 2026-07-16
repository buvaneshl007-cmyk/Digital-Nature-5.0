import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import {
  selectAllCourses,
  selectCoursesError,
  selectCoursesLoading,
} from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  courses$ = this.store.select(selectAllCourses);
  isLoading$ = this.store.select(selectCoursesLoading);
  error$ = this.store.select(selectCoursesError);

  searchTerm = '';
  selectedCourseId: number | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onSearch(): void {
    this.router.navigate(['courses'], {
      queryParams: this.searchTerm ? { search: this.searchTerm } : {},
    });
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  goToDetail(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }
}
