import { User } from '../../user/user.typings';
import { CreditContract } from '../credit/credit.typings';
import { DepositContract } from '../deposit/deposit.typings';

export interface BankDepositAccountInfo {
  user: {
    firstName: User['firstName'];
    lastName: User['lastName'];
    identificationNumber: User['identificationNumber'];
    id: User['id'];
  };
  depositContracts: BankAccountInfoDepositContract[];
}

export interface BankCreditAccountInfo {
  user: {
    firstName: User['firstName'];
    lastName: User['lastName'];
    identificationNumber: User['identificationNumber'];
    id: User['id'];
  };
  creditContracts: BankAccountInfoCreditContract[];
}

export interface BankAccountInfoDepositContract {
  serialNumber: DepositContract['serialNumber'];
  name: DepositContract['deposit']['name'];
  id: string;
}

export interface BankAccountInfoCreditContract {
  serialNumber: CreditContract['serialNumber'];
  name: CreditContract['credit']['name'];
  id: string;
}
