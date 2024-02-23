export interface CreditAccountSearchParms {
  userId: string;
  creditId: string;
}

export interface CreditAccounts {
  main: CreditMainAccount;
  percents: CreditPercentageAccount;
}

export interface CreditMainAccount {
  serialNumber: string;
  credit: number;
  id?: string;
}

export interface CreditPercentageAccount {
  serialNumber: string;
  credit: number;
  id?: string;
  totalAmount: number;
}
