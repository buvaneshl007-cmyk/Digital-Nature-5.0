import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/unsaved-changes.guard';

/** Custom sync validator: rejects course codes starting with "XX". */
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

/** Custom async validator: simulates a server-side "email taken" check. */
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taken = typeof control.value === 'string' && control.value.includes('test@');
      resolve(taken ? { emailTaken: true } : null);
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css',
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  private fb = inject(FormBuilder);

  enrollForm!: ReturnType<FormBuilder['group']>;
  submitted = false;

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck]
      ),
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  // `enrollForm.value` excludes disabled controls; `getRawValue()` includes
  // every control regardless of disabled state.
  onSubmit(): void {
    console.log('Form value:', this.enrollForm.value);
    console.log('Raw value:', this.enrollForm.getRawValue());
    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  // A typed getter avoids repeated `as FormArray` casts scattered through the
  // template and keeps the template strictly readable.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  hasUnsavedChanges(): boolean {
    return this.enrollForm.dirty && !this.submitted;
  }
}
