import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
//import { FirebaseAuthService } from '../../services/firebase.service';
import { AuthService } from '../../shared/services/auth.service';
import { NavbarGeneralComponent } from '../navbar-general/navbar-general.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarGeneralComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private hasRefreshed = false;

  constructor(public router: Router, public authService: AuthService) {}

  signIn(event: Event, email: string, password: string) {
    event.preventDefault();  // Prevent default form submission

    this.authService.login(email, password)
      .then(() => {
        alert('Thanks for logging in')
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

        // Refresh the window after 1 second
        //setTimeout(() => {
          //window.location.reload();
        //}, 1000);
        
      //})
      .catch(error => {
        console.error('Error signing in:', error.message);
        alert('Sign in failed. Please try again.');
      })
      .finally(() => {
        // Clear sensitive data from memory
        email = '';
        password = '';
      });

  }

}
