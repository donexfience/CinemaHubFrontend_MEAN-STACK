import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IUserRegisterCredentials } from '../../../../models/IRegisterCredentails.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  toggleShowHidePassword: boolean = false;
  toggleShowHideConfirmPassword: boolean = false;
  isFormSubmitted: boolean = false;
  registerForm: FormGroup;
  constructor() {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[A-Za-z]+@gmail\.com$/
          ),
        ]),
        //       ^: Start of the string
        // (?=.*[A-Za-z]): At least one letter (uppercase or lowercase)
        // (?=.*\d): At least one digit
        // (?=.*[@$!%*?&]): At least one special character from the set @$!%?&
        // [A-Za-z\d@$!%*?&]{8,}: At least 8 characters long, can include letters, digits, and the specified special characters

        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  togglePasswordVisibility(password: boolean = false): void {
    if (password) {
      this.toggleShowHidePassword = true;
    } else {
      this.toggleShowHideConfirmPassword = !this.toggleShowHideConfirmPassword;
    }
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }
  private trimAllWhiteSpaces(): void {
    Object.keys(this.registerForm.value).forEach((key) => {
      if (key) {
        const trimedValue: string = this.registerForm.get(key)?.value?.trim();
        this.registerForm.controls[key].setValue(trimedValue);
      }
    });
  }
  async onSubmit(): Promise<void> {
    console.log('Before trim:', this.registerForm.value);
    this.trimAllWhiteSpaces();
    console.log('After trim:', this.registerForm.value);
    if (this.registerForm.invalid || this.isFormSubmitted) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isFormSubmitted = true;
    const userRegisterCredentails: IUserRegisterCredentials = this.registerForm.value;
    console.log(userRegisterCredentails);
 
  }
}
