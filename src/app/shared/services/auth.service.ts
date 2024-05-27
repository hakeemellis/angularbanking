// auth.service.ts

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private hasRefreshed = false;

  //New Way for OnStateChange to store user
  private authStateSubject = new BehaviorSubject<User | null>(null);
  public authState = this.authStateSubject.asObservable();

  //UserData: any; - For old way

  constructor(public auth: Auth, public router: Router, public firestore: Firestore) {

        /* OLD WAY
          //To check if user is logged in or not
          onAuthStateChanged(this.auth, (user: any) => {
           if (user) {
            this.UserData = user;
            sessionStorage.setItem('user', JSON.stringify(this.UserData));
            JSON.parse(sessionStorage.getItem('user')!);
            console.log('signed in')
            console.error('Auth Local Storage Fix Top');
          } else {
            sessionStorage.setItem('user', 'null');
            JSON.parse(sessionStorage.getItem('user')!);
            console.log('Not Signed');
            console.error('Auth Local Storage Fix');
          }

  });*/

      // New Way
        onAuthStateChanged(this.auth, (user) => {
          this.authStateSubject.next(user);
          if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
          } else {
            sessionStorage.removeItem('user');
          }
        });
}

  async signUpWithEmail(email: string, password: string, fname: string, lname: string): Promise<UserCredential> {
    alert('Thanks for signing up. You will now be navigated to your dashboard')
    return createUserWithEmailAndPassword(
      this.auth,
      email.trim(),
      password.trim()
    )
    .then(async (userCredential) => {
      sessionStorage.setItem('user', JSON.stringify(userCredential.user));
      // Store additional user details in Firestore
      const userRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(userRef, {
        email: userCredential.user.email,
        firstName: fname,
        lastName: lname,  
        createdAt: new Date(),
      });
      return userCredential;
    });
  }

  /* 
  Old Sign Up with Email Way

    signUpWithEmail(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      email.trim(),
      password.trim()
    );
  }
  */

  login(email: string, password: string): Promise<UserCredential> {
    alert('Welcome!')
    return signInWithEmailAndPassword(
        this.auth,
        email.trim(),
        password.trim()
      );
    }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
      console.log('User signed out');

      // Reset hasRefreshed to false when signing out
      this.hasRefreshed = false;

    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  }

    // New method to fetch user details from Firestore
    async getUserDetails(uid: string): Promise<any> {
      const userRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userRef);
      return userDoc.exists() ? userDoc.data() : null;
    }
    
}
