import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackNavigationService {
  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.previousUrl = null;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }

  public getCurrentUrl(): string {
    return this.currentUrl;
  }

  public areCurrAndPrevUrlSame(): boolean {
    return this.currentUrl === this.previousUrl;
  }
}
