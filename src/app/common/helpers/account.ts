import { CreditAccounts } from '../../api/credit/account/account-api.typings';
import { DepositAccounts } from '../../api/deposit/account/account-api.typings';
import { ACCOUNT_SERIAL_NUMBER_LENGTH } from '../../components/bank-account/bank-account.constants';
import { CreditContract } from '../../components/bank-account/credit/credit.typings';
import { DepositContract } from '../../components/bank-account/deposit/deposit.typings';
import { getRandomString } from './random-values';

export function createDepositAccounts(
  depositContract: DepositContract
): DepositAccounts {
  return {
    main: {
      debit: depositContract.amount,
      serialNumber: getRandomString(ACCOUNT_SERIAL_NUMBER_LENGTH),
    },
    percents: {
      debit: 0,
      serialNumber: getRandomString(ACCOUNT_SERIAL_NUMBER_LENGTH),
      totalAmount: 0,
    },
  };
}

export function createCreditAccounts(
  creditContract: CreditContract
): CreditAccounts {
  return {
    main: {
      credit: creditContract.amount,
      serialNumber: getRandomString(ACCOUNT_SERIAL_NUMBER_LENGTH),
    },
    percents: {
      credit: 0,
      serialNumber: getRandomString(ACCOUNT_SERIAL_NUMBER_LENGTH),
      totalAmount: 0,
    },
  };
}
