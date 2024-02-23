import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrl: './atm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtmComponent implements OnInit {
  constructor(private router: Router) {}

  public ngOnInit(): void {
    console.log(this.getCurrNav());
  }

  public goToCardNumberPage(): void {
    this.router.navigate(['atm', 'card-number']);
  }

  public goToHomePage(): void {
    this.router.navigate(['home']);
  }

  public getCurrNav(): string {
    return this.router.url;
  }
}
