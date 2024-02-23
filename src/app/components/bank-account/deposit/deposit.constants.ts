import { CurrencyType } from '../../../common/typings/currency.typings';
import { Deposit, DepositType } from './deposit.typings';

function getDurationDate(
  date: Date,
  {
    year,
    month,
    day,
  }: {
    year?: number;
    month?: number;
    day?: number;
  }
): Date {
  let configuredDate: Date = year
    ? new Date(date.setFullYear(date.getFullYear() + year))
    : date;
  (configuredDate = month
    ? new Date(configuredDate.setMonth(configuredDate.getMonth() + month))
    : configuredDate),
    (configuredDate = day
      ? new Date(configuredDate.setDate(configuredDate.getDate() + day))
      : configuredDate);
  return configuredDate;
}

export const DEPOSITS: Deposit[] = [
  {
    name: 'Save',
    currencyType: CurrencyType.BYN,
    minDurationTime: 1,
    maxDurationTime: 3,
    minAmount: 1000,
    percent: 5,
    type: DepositType.Revocable,
  },

  {
    name: 'Cumulative',
    currencyType: CurrencyType.USD,
    minDurationTime: 1,
    maxDurationTime: 3,
    minAmount: 500,
    percent: 1.2,
    type: DepositType.Irrevocable,
  },

  {
    name: 'Reliable',
    currencyType: CurrencyType.EUR,
    minDurationTime: 1,
    maxDurationTime: 8,
    minAmount: 750,
    percent: 0.85,
    type: DepositType.Revocable,
  },
  {
    name: 'Profitable',
    currencyType: CurrencyType.RUS,
    minDurationTime: 3,
    maxDurationTime: 5,
    minAmount: 20000,
    percent: 8.5,
    type: DepositType.Revocable,
  },

  {
    name: 'Beneficial',
    currencyType: CurrencyType.USD,
    minDurationTime: 5,
    maxDurationTime: 10,
    minAmount: 10000,
    percent: 4.5,
    type: DepositType.Irrevocable,
  },
];

export const DEPOSIT_CONTRACT_SERIAL_NUMBER_LENGTH = 9;
