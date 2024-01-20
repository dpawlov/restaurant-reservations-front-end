// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      (authenticated) => {
        this.isLoggedIn = authenticated;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
