import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiService } from '../../../api/user/user-api.service';
import { UserCard } from '../user-card/user-card.typings';
import { User } from '../user.typings';

@Injectable()
export class UserPageService {
  constructor(private userApiService: UserApiService) {}

  public getUserCards(): Observable<UserCard[]> {
    return this.userApiService.getUsers();
  }

  public addUser(user: User): Observable<void> {
    return this.userApiService.addUser(user);
  }

  public removeUser(id: string): Observable<void> {
    return this.userApiService.removeUser(id);
  }

  public getSortedByLastNameUserCards(): Observable<UserCard[]> {
    return this.userApiService.getSortedUsers();
  }
}
