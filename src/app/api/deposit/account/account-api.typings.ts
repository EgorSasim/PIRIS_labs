import { User } from '../../../components/user/user.typings';

export interface DepositAccountSearchParms {
  userId: string;
  depositId: string;
}

export interface DepositAccounts {
  main: DepositMainAccount;
  percents: DepositPercentageAccount;
}

export interface DepositMainAccount {
  serialNumber: string;
  debit: number;
  id?: string;
}

export interface DepositPercentageAccount {
  serialNumber: string;
  debit: number;
  id?: string;
  totalAmount: number;
}
