import { Injectable } from '@angular/core';
import { BankCardApiService } from '../../../api/bank-card/bank-card-api.service';
import { ValidatedPin } from './pin-page.typings';
import { Observable } from 'rxjs';

@Injectable()
export class PinPageService {
  constructor(private bankCardApiService: BankCardApiService) {}

  public validatePin(
    userId: string,
    bankCardId: string,
    pin: number
  ): Observable<ValidatedPin> {
    return this.bankCardApiService.validatePin(userId, bankCardId, pin);
  }
}
