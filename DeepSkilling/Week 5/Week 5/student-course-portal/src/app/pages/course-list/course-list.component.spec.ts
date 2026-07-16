import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CourseListComponent } from './course-list.component';
import { selectAllCourses, selectCoursesLoading } from '../../store/course/course.selectors';
import { Course } from '../../models/course.model';

describe('CourseListComponent (NgRx MockStore)', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideMockStore({
          initialState: { course: { courses: mockCourses, loading: false, error: null } },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
  });

  it('should render course cards from the initial mock state', () => {
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-course-card');
    expect(cards.length).toBe(2);
  });

  it('should show the loading indicator when the loading selector is true', () => {
    store.overrideSelector(selectCoursesLoading, true);
    store.overrideSelector(selectAllCourses, []);
    store.refreshState();
    fixture.detectChanges();

    const loadingText = fixture.nativeElement.textContent;
    expect(loadingText).toContain('Loading courses...');
  });
});
