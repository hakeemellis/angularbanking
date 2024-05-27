// home.component.ts

import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarGeneralComponent } from '../navbar-general/navbar-general.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarGeneralComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

}
