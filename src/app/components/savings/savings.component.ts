import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { SavingsService } from '../../services/savings.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; //ensures the async pipe can be used in html
import { FormsModule } from '@angular/forms'; //allows the use of NgModel in html

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, TransactionHistoryComponent, NavbarComponent, FooterComponent],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss'
})
export class SavingsComponent implements OnInit {

  savingsbalance$: Observable<number | null>;
  //amount: number = 0;

  depositAmount: number = 0;
  withdrawAmount: number = 0;
  
  constructor(public savingsService: SavingsService) { 
    this.savingsbalance$ = this.savingsService.getBalance();
  }

  ngOnInit(): void {}

  deposit(): void {
    if (this.depositAmount > 0) {
      this.savingsService.deposit(this.depositAmount);
      this.depositAmount = 0;
    }
  }

  withdraw(): void {
    if (this.withdrawAmount > 0) {
      this.savingsService.withdraw(this.withdrawAmount);
      this.withdrawAmount = 0;
    }
  }

}
