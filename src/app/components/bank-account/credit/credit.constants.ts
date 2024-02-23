import { CurrencyType } from '../../../common/typings/currency.typings';
import { Credit } from './credit.typings';

export const CREDITS: Credit[] = [
  {
    name: 'Optimal',
    minDurationTime: 1,
    maxDurationTime: 60,
    currencyType: CurrencyType.USD,
    minAmount: 1000,
    percent: 6,
  },
  {
    name: 'Update',
    minDurationTime: 1,
    maxDurationTime: 3,
    currencyType: CurrencyType.EUR,
    minAmount: 2000,
    percent: 4,
  },
  {
    name: 'For all purposes',
    minDurationTime: 2,
    maxDurationTime: 30,
    currencyType: CurrencyType.BYN,
    minAmount: 3000,
    percent: 16,
  },
  {
    name: 'Refinance',
    minDurationTime: 1,
    maxDurationTime: 12,
    currencyType: CurrencyType.RUS,
    minAmount: 20000,
    percent: 20,
  },
  {
    name: 'Nudes cash',
    minDurationTime: 1,
    maxDurationTime: 69,
    currencyType: CurrencyType.USD,
    minAmount: 5000,
    percent: 69,
  },
];

export const CREDIT_CONTRACT_SERIAL_NUMBER_LENGTH = 9;
