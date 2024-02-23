import { Injectable } from '@angular/core';
import { BankCardApiService } from '../../../api/bank-card/bank-card-api.service';
import { Observable } from 'rxjs';
import { BankCard } from '../../../api/bank-card/bank-card-api.typings';

@Injectable()
export class CardNumberPageService {
  constructor(private bankCardApiService: BankCardApiService) {}

  public searchCardByNumber(cardNumber: number): Observable<BankCard | null> {
    return this.bankCardApiService.searchBankCard(cardNumber);
  }
}
