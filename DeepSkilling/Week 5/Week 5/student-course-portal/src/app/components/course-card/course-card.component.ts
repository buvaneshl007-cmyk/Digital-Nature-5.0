import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  private enrollmentService = inject(EnrollmentService);
  private store = inject(Store);
  enrolledIds$ = this.store.select(selectEnrolledIds);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'Course input changed. Previous:',
        changes['course'].previousValue,
        'Current:',
        changes['course'].currentValue
      );
    }
  }

  get cardClasses() {
    return {
      'card--enrolled': this.enrollmentService.isEnrolled(this.course?.id),
      'card--full': this.course?.credits >= 4,
      expanded: this.isExpanded,
    };
  }

  get borderStyle() {
    const colours: Record<string, string> = {
      passed: 'green',
      failed: 'red',
      pending: 'grey',
    };
    return { borderLeftColor: colours[this.course?.gradeStatus] ?? 'grey' };
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    this.enrollRequested.emit(this.course.id);
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.enrollmentService.enroll(this.course.id);
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
  }
}
