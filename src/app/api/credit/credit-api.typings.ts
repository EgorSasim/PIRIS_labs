import { CreditContract } from '../../components/bank-account/credit/credit.typings';
import { User } from '../../components/user/user.typings';

export interface CreditSearchParams {
  userId: User['id'];
  creditId: CreditContract['id'];
}
