// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserLoginDto } from '../user-login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDto: UserLoginDto = {
    username: '',
    password: ''
  };
  loginErrorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginDto)
      .subscribe(
        () => {
          debugger;
            // Login successful, navigate to the main page
            this.router.navigate(['']);
        },
         (error) => {
          // Handle login error
          if (error.status === 403) {
            // Unauthorized: Invalid username or password
            this.loginErrorMessage = 'Invalid username or password';
          } else {
            // Other error, display a generic message
            this.loginErrorMessage = 'Login failed';
          }
        }
      );
  }
}