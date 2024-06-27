// login.component.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',  // Updated to use external HTML file
  styleUrls: ['./login.component.scss']   // Optional: Include if you have CSS
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string; // Optional: to display error messages
  returnUrl: string;
  message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.notificationService.currentMessage.subscribe(msg => this.message = msg);
  }

  ngOnInit() {
    // reset login status
    this.authService.logout();

    this.route.queryParams.subscribe(params => {
      if (params['registered']) {
        // Optionally clear the message after displaying it
        setTimeout(() => this.notificationService.changeMessage(''), 5000);
      }});

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials.'; // Display error message
      }
    });
  }
}
