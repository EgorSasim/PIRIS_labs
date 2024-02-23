import {
  BankDepositAccountInfo,
  BankAccountInfoDepositContract,
} from '../bank-account-list/bank-account-list.typings';

export interface BankAccountCard {
  user: BankDepositAccountInfo['user'];
  contract: BankAccountInfoDepositContract;
}
