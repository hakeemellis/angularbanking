import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

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
    event.preventDefault(); // Blocks href from executing
    this.authService.signOut();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Toggle the menu's open state
    console.log(this.isMenuOpen)
  }

}
