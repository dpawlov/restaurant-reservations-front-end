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
          // Login successful, navigate to the main page
          this.router.navigate(['']); // Adjust the route as per your application
        },
        (error) => {
          // Handle login error
          this.loginErrorMessage = 'Login failed: ' + error.message;
        }
      );
  }
}
