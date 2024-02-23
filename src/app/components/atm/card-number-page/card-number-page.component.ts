import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardNumberPageService } from './card-number-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { BANK_CARD_SERIAL_NUMBER_LENGTH } from '../../../api/bank-card/bank-card-api.constants';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BankCard } from '../../../api/bank-card/bank-card-api.typings';

@Component({
  selector: 'app-card-number-page',
  templateUrl: './card-number-page.component.html',
  styleUrl: './card-number-page.component.scss',
  providers: [CardNumberPageService, MatSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardNumberPageComponent {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private cardNumberPageService: CardNumberPageService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  public searchBankCardBySerialNumber(serialNumber: number) {
    if (serialNumber.toString().length != BANK_CARD_SERIAL_NUMBER_LENGTH) {
      this.matSnackBar.open('invalid card number', null, { duration: 1000 });
      return;
    }
    this.isLoading$.next(true);
    this.cardNumberPageService
      .searchCardByNumber(serialNumber)
      .subscribe((bankCard: BankCard) => {
        if (!bankCard) {
          this.matSnackBar.open('such card number does not exists', null, {
            duration: 1000,
          });
        }
        console.log('bank Card:  ', bankCard);
        this.router.navigate(['atm', 'pin'], {
          queryParams: {
            serialNumber: bankCard.serialNumber,
            id: bankCard.id,
            userId: bankCard.userId,
          },
        });
        this.isLoading$.next(false);
      });
  }
}
