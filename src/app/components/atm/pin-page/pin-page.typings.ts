export interface ValidatedPin {
  isValid: boolean;
  userId?: string;
  bankCardSerialNumber: number;
  bankCardPin: number;
}
