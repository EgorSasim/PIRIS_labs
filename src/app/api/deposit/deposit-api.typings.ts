import { DepositContract } from '../../components/bank-account/deposit/deposit.typings';
import { User } from '../../components/user/user.typings';

export interface DepositSearchParams {
  userId: User['id'];
  depositId: DepositContract['id'];
}
