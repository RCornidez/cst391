import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isSignup = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
    });
  }

  get passwordMismatch(): boolean {
    const pw = this.form.get('password')?.value;
    const confirm = this.form.get('confirmPassword')?.value;
    return this.isSignup && !!confirm && pw !== confirm;
  }

  toggleMode() {
    this.isSignup = !this.isSignup;
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (this.passwordMismatch) {
      this.snackbar.error('Passwords do not match');
      return;
    }
    const { email, password } = this.form.value;

    if (this.isSignup) {
      this.auth.register(email, password).subscribe({
        next: () => {
          this.snackbar.success('Account created! Please sign in.');
          this.isSignup = false;
          this.form.reset();
        },
        error: (err) => this.snackbar.error(err.error?.message ?? 'Registration failed')
      });
    } else {
      this.auth.login(email, password).subscribe({
        next: () => {
          this.snackbar.success('Signed in successfully.');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => this.snackbar.error(err.error?.message ?? 'Login failed')
      });
    }
  }
}
