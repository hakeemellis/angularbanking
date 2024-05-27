// navigation.service.ts

import { Injectable } from '@angular/core';
import { Router, Event,  NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string = '';
  private currentUrl: string = '';

  constructor(public router: Router) {
    this.currentUrl = this.router.url;
    router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }
}

