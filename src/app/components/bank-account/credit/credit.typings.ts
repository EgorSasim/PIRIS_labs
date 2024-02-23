import { CurrencyType } from '../../../common/typings/currency.typings';
import { User } from '../../user/user.typings';

export interface CreditContract {
  serialNumber: number;
  credit: Credit;
  startDate: Date;
  endDate: Date;
  duration: Date;
  amount: number;
  userId: User['id'];
  id?: string;
}

export interface Credit {
  name: string;
  minDurationTime: number;
  maxDurationTime: number;
  minAmount: number;
  percent: number;
  currencyType: CurrencyType;
}
