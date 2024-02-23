import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BankDepositAccountInfo } from '../bank-account-list/bank-account-list.typings';
import { BankAccountCard } from './bank-account-card.typings';

@Component({
  selector: 'app-bank-account-card',
  templateUrl: './bank-account-card.component.html',
  styleUrl: './bank-account-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountCardComponent {
  @Input() public accountInfo: BankAccountCard;
}
