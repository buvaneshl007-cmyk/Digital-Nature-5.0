import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideStore } from '@ngrx/store';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';
import { courseReducer } from '../../store/course/course.reducer';
import { enrollmentReducer } from '../../store/enrollment/enrollment.reducer';

describe('CourseCardComponent', () => {
  let fixture: ComponentFixture<CourseCardComponent>;
  let component: CourseCardComponent;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideStore({ course: courseReducer, enrollment: enrollmentReducer }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the course name from @Input()', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('h3')).nativeElement.textContent;
    expect(heading).toContain('Data Structures');
  });

  it('should emit enrollRequested with the course id when the enroll button is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    spyOn(component.enrollRequested, 'emit');

    const enrollButton = fixture.debugElement.query(By.css('.actions button'));
    enrollButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log previous and current values on ngOnChanges', () => {
    spyOn(console, 'log');
    component.course = mockCourse;
    component.ngOnChanges({
      course: {
        previousValue: undefined,
        currentValue: mockCourse,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(console.log).toHaveBeenCalled();
  });

  it('should toggle isExpanded on "Show Details" click', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component.isExpanded).toBeFalse();

    const detailsButton = fixture.debugElement.query(By.css('.actions button.secondary'));
    detailsButton.nativeElement.click();

    expect(component.isExpanded).toBeTrue();
  });
});
