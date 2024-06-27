import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {

    return this.authService.currentUserValue != null && Object.keys(this.authService.currentUserValue).length != 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
