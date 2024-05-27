//signup.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NavbarGeneralComponent } from '../navbar-general/navbar-general.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarGeneralComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  private hasRefreshed = false;
  
  constructor(public authService: AuthService, private router: Router) {}

  signUp(event: Event, email: string, fname: string, lname: string, password: string, confirmPassword: string) {
    event.preventDefault();  // Prevent default form submission
    console.log('Form submitted:', email, fname, lname, password, confirmPassword); // Debugging line
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.signUpWithEmail(email, password, fname, lname)
      .then(() => {
        this.router.navigate(['/dashboard']);

        // Refresh the window only if it hasn't been refreshed already
        if (!this.hasRefreshed) {
          setTimeout(() => {
            window.location.reload();
            this.hasRefreshed = true;
            console.log(this.hasRefreshed) // Set the flag to true after refreshing
          }, 1);
        }
      })
      .catch(error => {
        console.error('Error signing up:', error.message);
        alert('Sign up failed. Please try again.');
      })
      .finally(() => {
        // Clear sensitive data from memory
        email = '';
        password = '';
      });
  }
}
