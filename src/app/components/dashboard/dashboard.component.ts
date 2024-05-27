import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../shared/services/auth.service';
import { ChequingService } from '../../services/chequing.service';
import { SavingsService } from '../../services/savings.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  firstName: string = '';
  chequingbalance$: Observable<number | null>; // Observable to hold the balance
  savingsbalance$: Observable<number | null>; // Observable to hold the balance

  constructor(private authService: AuthService, private chequingService: ChequingService,
    private savingsService: SavingsService) { // Inject ChequingService
    this.chequingbalance$ = this.chequingService.getBalance(); // Initialize the balance observable
    this.savingsbalance$ = this.savingsService.getBalance(); // Initialize the balance observable
  }

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.uid) {
      this.authService.getUserDetails(user.uid).then(userDetails => {
        if (userDetails && userDetails.firstName) {
          this.firstName = userDetails.firstName;
        }
      });
    }
  }

    // Method to log when the anchor tag is clicked
    logAnchorClick(): void {
      console.log('Anchor tag clicked!');
    }

    alertClick(): void {
      alert('Coming Soon');
    }

}
