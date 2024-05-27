import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-general',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './navbar-general.component.html',
  styleUrl: './navbar-general.component.scss'
})
export class NavbarGeneralComponent implements OnInit {
  isLoggedIn: boolean = false;
  isMenuOpen: boolean = false;

  constructor(public AppComponent: AppComponent, public authService: AuthService) {}

  //Checks if user is still logged in
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  toggleDarkMode(event: Event): void {
    event.preventDefault(); // Blocks href from executing
    this.AppComponent.toggleDarkMode();
  }

  signOut(event: Event): void {
    event.preventDefault(); // Prevents default behavior of anchor tag
    if (this.isLoggedIn) {
      // User is logged in, trigger sign out
      this.authService.signOut();
    } else {
      // User is not logged in, trigger alert
      alert('Not Logged In');
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Toggle the menu's open state
    console.log(this.isMenuOpen)
  }

}

