import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string; 
  isAdmin : boolean = false;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService,) {}

  ngOnInit() {
    if(this.router.url.includes("Admin")) {
      this.isAdmin = true;
    }
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Construct the signup request object
    const signupRequest = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      phone: this.phone,
      password: this.password
    };

    // Call AuthService to send signup request
    this.authService.signup(signupRequest, this.isAdmin).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        // Navigate to the login page or dashboard
        this.notificationService.changeMessage('Account successfully created. Please log in.');
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
     error: error => {
      console.error('Login failed', error);
        this.errorMessage = error.error; // Display error message
     }
    }
    
    );
  }
}
