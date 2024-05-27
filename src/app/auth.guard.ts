// auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { NavigationService } from './shared/services/navigation.service';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    const navigationService = inject(NavigationService);

    // Retrieve the user from sessionStorage
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    console.log('Current User:', user); // Debug, to show me who's logged in

    // Modified for AuthGuard to handle previous URL
    if (!user) {
      router.navigate(['/cannotaccess']);
      alert('Sorry. You will have to login first to access here');
      setTimeout(() => {
        const previousUrl = navigationService.getPreviousUrl();
        console.log(previousUrl)
        console.log('Works Though')
        router.navigate([previousUrl || '/login']);
          //router.navigate(['/login']);
      }, 2500); // Redirect to login after 3 seconds
      return false;
  }

    /* Old way
    if (!user) {
        alert('Sorry. You will have to login first to access here')
        router.navigate(['/login']);
        return false;
    }*/

    return true;
};
