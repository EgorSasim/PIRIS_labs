import { User } from '../../../user/user.typings';

export interface UserDepositInfo {
  firstName: User['firstName'];
  lastName: User['lastName'];
  id: User['id'];
}
