import { User } from '../../../user/user.typings';

export interface UserCreditInfo {
  firstName: User['firstName'];
  lastName: User['lastName'];
  id: User['id'];
}
