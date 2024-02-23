import { CurrencyType } from '../../../common/typings/currency.typings';
import { User } from '../../user/user.typings';

export interface DepositContract {
  serialNumber: number;
  deposit: Deposit;
  startDate: Date;
  endDate: Date;
  duration: Date;
  amount: number;
  userId: User['id'];
  id?: string;
}

export interface Deposit {
  name: string;
  minDurationTime: number;
  maxDurationTime: number;
  minAmount: number;
  type: DepositType;
  percent: number;
  currencyType: CurrencyType;
}

export enum DepositType {
  Revocable = 'Revocable',
  Irrevocable = 'Irrevocable',
}
