import { DepositAccounts } from '../../../../api/deposit/account/account-api.typings';
import { DepositContract } from '../deposit.typings';

export interface DepositContractWithAccounts {
  depositContract: DepositContract;
  accounts: DepositAccounts;
}
