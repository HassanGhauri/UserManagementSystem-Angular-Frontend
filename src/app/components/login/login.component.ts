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
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, PRIME_ANGULAR_MODULES],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
  private fb: FormBuilder,
  private router: Router
) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {
    console.log(this.loginForm.value);

    this.router.navigate(['/app/home']);
  }
}
}
