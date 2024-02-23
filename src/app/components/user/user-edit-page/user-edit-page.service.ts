import { Injectable } from '@angular/core';
import { UserApiService } from '../../../api/user/user-api.service';
import { Observable } from 'rxjs';
import { User } from '../user.typings';

@Injectable()
export class UserEditPageService {
  constructor(private userApiService: UserApiService) {}

  public getUser(id: string): Observable<User> {
    return this.userApiService.getUser(id);
  }

  public updateUser(user: User): Observable<void> {
    return this.userApiService.updateUser(user);
  }
}
