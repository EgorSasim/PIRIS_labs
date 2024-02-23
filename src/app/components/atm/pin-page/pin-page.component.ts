import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { PinPageService } from './pin-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pin-page',
  templateUrl: './pin-page.component.html',
  styleUrl: './pin-page.component.scss',
  providers: [PinPageService, MatSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinPageComponent {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userId: string;
  public bankCardId: string;
  public bankCardSerialNumber: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pinPageService: PinPageService,
    private matSnackBar: MatSnackBar
  ) {
    this.activatedRoute.queryParamMap
      .pipe(
        tap((params) => {
          this.userId = params.get('userId');
          this.bankCardId = params.get('id');
          this.bankCardSerialNumber = +params.get('serialNumber');
        })
      )
      .subscribe(() => {
        if (!this.userId || !this.bankCardId || !this.bankCardSerialNumber) {
          console.log('not enought data');
          this.router.navigate(['atm/card-number']);
        }
      });
  }

  public validatePin(pin: number): void {
    this.isLoading$.next(true);
    this.pinPageService
      .validatePin(this.userId, this.bankCardId, pin)
      .subscribe((validationRes) => {
        this.isLoading$.next(false);
        if (!validationRes.isValid) {
          this.matSnackBar.open('invalid pin', null, { duration: 1000 });
          return;
        }
        this.router.navigate(['atm', 'account'], {
          queryParams: { userId: this.userId, bankCardId: this.bankCardId },
        });
      });
  }
}
