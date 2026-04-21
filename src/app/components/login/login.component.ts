import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PRIME_ANGULAR_MODULES } from '../../primeng.imports';
import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, PRIME_ANGULAR_MODULES],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.userService.login('login',this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;

          if (response.success) {
            console.log(response);

            this.router.navigate(['/app/home']);
          } else {
            this.errorMessage = response.message;
          }
        },

        error: (error) => {
          this.loading = false;

          if (error.error?.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Login failed';
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}