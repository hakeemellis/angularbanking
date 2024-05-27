// chequing.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { ChequingService } from '../../services/chequing.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; //ensures the async pipe can be used in html
import { FormsModule } from '@angular/forms'; //allows the use of NgModel in html

@Component({
  selector: 'app-chequing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, TransactionHistoryComponent, NavbarComponent, FooterComponent],
  templateUrl: './chequing.component.html',
  styleUrl: './chequing.component.scss'
})
export class ChequingComponent implements OnInit {

  chequingbalance$: Observable<number | null>;
  //amount: number = 0;

  depositAmount: number = 0;
  withdrawAmount: number = 0;
  
  constructor(public chequingService: ChequingService) { 
    this.chequingbalance$ = this.chequingService.getBalance();
  }

  ngOnInit(): void {}

  deposit(): void {
    if (this.depositAmount > 0) {
      this.chequingService.deposit(this.depositAmount);
      this.depositAmount = 0;
    }
  }

  withdraw(): void {
    if (this.withdrawAmount > 0) {
      this.chequingService.withdraw(this.withdrawAmount);
      this.withdrawAmount = 0;
    }
  }


/* Previous code

  balance: number = 0; // Have to give integer a balance to start | if balance? - it would've turned optional

  constructor() { }

  ngOnInit(): void {

    this.balance = 1000; // Balance is then defined here
  }

 */

}
