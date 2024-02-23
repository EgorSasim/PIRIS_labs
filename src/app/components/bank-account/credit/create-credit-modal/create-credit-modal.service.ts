import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserApiService } from '../../../../api/user/user-api.service';
import { UserCreditInfo } from './create-credit-modal.typings';

@Injectable()
export class CreateCreditModalService {
  constructor(private userApiService: UserApiService) {}

  public getUsersInfo(): Observable<UserCreditInfo[]> {
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
