import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({ email: '', password: '' });
  }

  onSubmit() {
    if (this.authService.login(this.loginForm.value.email, this.loginForm.value.password)) {
      this.router.navigate(['/profile']); // Redirect to profile on success
    } else {
      alert('Invalid credentials');
    }
  }
}
