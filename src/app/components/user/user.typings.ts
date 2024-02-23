export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: Date;
  passportSeries: string;
  passportNumber: string;
  issuedBy: string;
  dateOfIssue: Date;
  identificationNumber: string;
  placeOfBirth: string;
  actualResidenceCity: UserCity;
  actualResidenceAddress: string;
  homePhoneNumber?: string;
  mobilePhoneNumber?: string;
  email?: string;
  workPlace?: string;
  workPosition?: string;
  martialStatus: UserMartialStatus;
  citizenship: UserCitizenship;
  disability: UserDisability;
  pensionary: boolean;
  monthlyIncome: Number;
  conscript: boolean;
}

export enum UserCity {
  Minsk = 'Minsk',
  Vitebsk = 'Vitebsk',
  Mogilev = 'Mogilev',
  Volozhin = 'Volozhin',
  Baranovichi = 'Baranovichi',
  Mozir = 'Mozir',
}

export enum UserMartialStatus {
  Married = 'Married',
  Single = 'Single',
  Divorced = 'Divorced',
}

export enum UserCitizenship {
  Belarus = 'Belarus',
  Russia = 'Russia',
  Turkey = 'Turkey',
  Kazahstan = 'Kazahstan',
}

export enum UserDisability {
  None = 'None',
  FirstDegree = 'FirstDegree',
  SecondDegree = 'SecondDegree',
  ThirdDegree = 'ThirdDegree',
  FourthDegree = 'FourthDegree',
  DotaPlusPlayer = 'DotaPlusPlayer',
}
