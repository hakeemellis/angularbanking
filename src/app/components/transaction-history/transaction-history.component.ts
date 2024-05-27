// transaction-history.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Database, ref, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  @Input() type: 'chequing' | 'savings' = 'chequing';
  transactionHistory$!: Observable<any[]>;

  constructor(private db: Database) {}

  ngOnInit(): void {
    const userFromStorage = sessionStorage.getItem('user');
    if (userFromStorage && userFromStorage !== 'null') {
      const user = JSON.parse(userFromStorage);
      const uid = user?.uid;
      if (uid) {
        const transactionHistoryRef = ref(this.db, `users/${uid}/${this.type}/transactions`);
        this.transactionHistory$ = new Observable(observer => {
          onValue(transactionHistoryRef, snapshot => {
            const value = snapshot.val();
            if (value) {
              const transactions = Object.keys(value).map(key => ({ id: key, ...value[key] }));
              const sortedTransactions = transactions.sort((a, b) => b.timestamp - a.timestamp);
              observer.next(sortedTransactions);
            } else {
              observer.next([]);
            }
          });
        });
      } else {
        console.error("User UID not found.");
        this.transactionHistory$ = new Observable(observer => {
          observer.next([]);
        });
      }
    } else {
      console.error("User is not authenticated.");
      this.transactionHistory$ = new Observable(observer => {
        observer.next([]);
      });
    }
  }
}
