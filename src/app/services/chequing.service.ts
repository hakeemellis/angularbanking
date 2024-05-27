import { Injectable } from '@angular/core';
import { Database, ref, objectVal, set, push } from '@angular/fire/database';
import { Observable, take, of } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChequingService {

  private balanceRef: any;
  private transactionHistoryRef: any;
  chequingbalance$: Observable<number | null>;

  constructor(private db: Database, private auth: Auth) {
    const userFromStorage = sessionStorage.getItem('user');
    if (userFromStorage && userFromStorage !== 'null') {
      const user = JSON.parse(userFromStorage);
      const uid = user?.uid;
      if (uid) {
        this.balanceRef = ref(this.db, `users/${uid}/chequing/balance`);
        this.transactionHistoryRef = ref(this.db, `users/${uid}/chequing/transactions`);
        this.chequingbalance$ = objectVal<number | null>(this.balanceRef).pipe(
          map(balance => balance ?? 0), // If balance is null or undefined, return 0
          catchError(error => {
            console.error('Error retrieving balance:', error);
            return of(0); // Return 0 if an error occurs
          })
        );
      } else {
        console.error("User UID not found.");
        this.chequingbalance$ = new Observable(observer => {
          observer.next(null);
        });
      }
    } else {
      console.error("User is not authenticated.");
      this.chequingbalance$ = new Observable(observer => {
        observer.next(null);
      });
    }
  }

  getBalance(): Observable<number | null> {
    return this.chequingbalance$;
  }

  async deposit(amount: number): Promise<void> {
    this.chequingbalance$.pipe(take(1)).subscribe(async balance => {
      const updatedBalance = (balance ?? 0) + amount;
      await set(this.balanceRef, updatedBalance);
      await this.logTransaction('deposit', amount);
    });
  }

  async withdraw(amount: number): Promise<void> {
    this.chequingbalance$.pipe(take(1)).subscribe(async balance => {
      const updatedBalance = (balance ?? 0) - amount;
      if (updatedBalance >= 0) {
        await set(this.balanceRef, updatedBalance);
        await this.logTransaction('withdrawal', amount);
      } else {
        alert('Insufficient funds');
        console.error('Insufficient funds');
      }
    });
  }

  private async logTransaction(type: string, amount: number): Promise<void> {
    const timestamp = Date.now();
    const transaction = {
      type: type,
      amount: amount,
      timestamp: timestamp
    };
    await push(this.transactionHistoryRef, transaction);
  }
}
