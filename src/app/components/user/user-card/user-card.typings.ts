import { User } from '../user.typings';

export type UserCard = Pick<
  User,
  'firstName' | 'lastName' | 'passportNumber' | 'passportSeries' | 'id'
>;
