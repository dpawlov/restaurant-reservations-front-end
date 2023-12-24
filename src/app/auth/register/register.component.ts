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

    // Add validation for username length
    if (this.userDto.username.length <= 3) {
      this.errorMessage = 'Username must be at least 3 characters long.';
      return;
    }

    // Add validation for password length
    if (this.userDto.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    // Add validation for password requirements
    if (!this.isValidPassword()) {
      this.errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one of the symbols #$@!~.';
      return;
    }

    this.authService.register(this.userDto)
      .subscribe(
        () => {
          debugger;
          // Registration successful, navigate to the main page
          this.router.navigate(['']); 
        },
        (error) => {
          // Handle registration error
          if (error.status === 400) {
            // Assuming a 400 status indicates a validation error
            this.errorMessage = 'Invalid registration request. Please check your inputs.';
          } else {
            // Handle other types of errors
            this.errorMessage = 'Registration failed';
          }
        }
      );
  }

  // Function to check password requirements
  isValidPassword(): boolean {
    // Add your password validation logic here
    // For example, checking for at least one uppercase, one lowercase, one digit, and one symbol #$@!~
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!~]).+$/;
    return regex.test(this.userDto.password);
  }
}
