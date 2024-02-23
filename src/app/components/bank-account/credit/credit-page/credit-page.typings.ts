import { CreditAccounts } from '../../../../api/credit/account/account-api.typings';
import { CreditContract } from '../credit.typings';

export interface CreditContractWithAccounts {
  creditContract: CreditContract;
  accounts: CreditAccounts;
}
