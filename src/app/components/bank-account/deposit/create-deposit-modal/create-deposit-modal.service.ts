import { Injectable } from '@angular/core';
import { User } from '../../../user/user.typings';
import { UserDepositInfo } from './create-deposit-modal.typings';
import { Observable, map } from 'rxjs';
import { UserApiService } from '../../../../api/user/user-api.service';

@Injectable()
export class CreateDepositModalService {
  constructor(private userApiService: UserApiService) {}

  public getUsersInfo(): Observable<UserDepositInfo[]> {
    return this.userApiService.getUsers().pipe(
      map((users) =>
        users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
        }))
      )
    );
  }
}
