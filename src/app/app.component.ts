// app.component.ts

import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public router: Router, public authService: AuthService) {}

  // Dark Mode
  darkMode = false;

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const storedDarkMode = localStorage.getItem('darkMode');
      if (storedDarkMode !== null) {
        this.darkMode = JSON.parse(storedDarkMode);
        this.applyDarkMode();
      }
    } else {
      // Show in terminal/server that localStorage is not available
      console.error('localStorage is not available.');
    }
  }


  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.applyDarkMode();
    // To store dark mode state in localStorage
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }

  public applyDarkMode(): void {
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /* OG DARK MODE CODE
  toggleDarkMode(): void{
    this.darkMode = !this.darkMode; //this reverses the logic and makes it true

    if (this.darkMode) {
      document.documentElement.classList.add('dark'); // so if true, show the class "dark"
    }
    else{
      document.documentElement.classList.remove('dark') // if false, remove the class
    }
  }
  */
}