// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserCreateDto } from '../user-create-dto.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userDto: UserCreateDto = {
    username: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.userDto.password !== this.userDto.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Validation for username length
    if (this.userDto.username.length <= 3) {
      this.errorMessage = 'Username must be at least 3 characters long.';
      return;
    }

    // Validation for password length
    if (this.userDto.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    if (!this.isValidPassword()) {
      this.errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one of the symbols #$@!~.';
      return;
    }

    this.authService.register(this.userDto)
      .subscribe(
        () => {
          this.router.navigate(['/login']); 
        },
        (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Username already taken.';
          } else {
            this.errorMessage = 'Registration failed';
          }
        }
      );
  }

  // Function to check password requirements
  isValidPassword(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!~]).+$/;
    return regex.test(this.userDto.password);
  }
}
