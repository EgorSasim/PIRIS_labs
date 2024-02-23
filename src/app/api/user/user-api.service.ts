import { Injectable } from '@angular/core';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../components/user/user.typings';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SameUserErrorCode } from './user-api.typings';
import { USERS_COLLECTION_NAME } from './user-api.constants';
import { BankCardApiService } from '../bank-card/bank-card-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private usersCache: User[];

  constructor(
    private store: AngularFirestore,
    private bankCardApiService: BankCardApiService
  ) {}

  public getUsers(): Observable<User[]> {
    const usersCollectionRef: Observable<User[]> = this.store
      .collection(USERS_COLLECTION_NAME)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => {
            const data: User = change.payload.doc.data() as User;
            const id = change.payload.doc.id;
            return { ...data, id };
          })
        ),
        tap((users) => {
          this.updateUsersCache(users);
        })
      ) as Observable<User[]>;
    return usersCollectionRef;
  }

  public getSortedUsers(): Observable<User[]> {
    const usersCollectionRef: Observable<User[]> = this.store
      .collection(USERS_COLLECTION_NAME, (ref) => ref.orderBy('lastName'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => {
            const data: User = change.payload.doc.data() as User;
            const id = change.payload.doc.id;
            return { id, ...data };
          })
        ),
        tap((users) => this.updateUsersCache(users))
      ) as Observable<User[]>;
    return usersCollectionRef;
  }

  public addUser(user: User): Observable<void> {
    if (this.isSameUserExists(user)) {
      return of();
    }
    return from(
      this.store.collection(USERS_COLLECTION_NAME).add({ ...user })
    ).pipe(
      switchMap((ref) => this.bankCardApiService.createBankCard(ref.id))
    ) as Observable<void>;
  }

  public getUser(id: string): Observable<User> {
    const userDocumentRef = this.store
      .collection(USERS_COLLECTION_NAME)
      .doc(id)
      .valueChanges()
      .pipe(
        map((user: User) => ({
          ...user,
          dateOfIssue: user?.dateOfIssue
            ? new Date(user?.dateOfIssue?.['seconds'] * 1000)
            : null,
          birthDate: user?.birthDate
            ? new Date(user?.birthDate?.['seconds'] * 1000)
            : null,
        }))
      );
    return userDocumentRef as Observable<User>;
  }

  public updateUser(user: User): Observable<void> {
    const userDocumentRef = this.store
      .collection(USERS_COLLECTION_NAME)
      .doc(user.id)
      .update(user);
    return from(userDocumentRef);
  }

  public removeUser(id: string): Observable<void> {
    const usersCollectionRef = this.store.collection(USERS_COLLECTION_NAME);
    return from(usersCollectionRef.doc(id).delete());
  }

  private showSameUserExistanceError(sameUserErrorCode: SameUserErrorCode) {
    switch (sameUserErrorCode) {
      case SameUserErrorCode.SameIdentificationNumber:
        alert('Error: Same identification number');
        return;
      case SameUserErrorCode.SamePassport:
        alert('Error: Same passport');
    }
  }

  private isSameUserExists(user: User): boolean {
    const isSameIdentificationNumber = this.usersCache.find(
      (cachedUser) =>
        cachedUser.identificationNumber === user.identificationNumber
    );
    if (isSameIdentificationNumber) {
      this.showSameUserExistanceError(
        SameUserErrorCode.SameIdentificationNumber
      );
      return true;
    }
    const isSamePassport = this.usersCache.find(
      (cachedUser) =>
        cachedUser.passportNumber === user.passportNumber &&
        cachedUser.passportSeries === user.passportSeries
    );
    if (isSamePassport) {
      this.showSameUserExistanceError(SameUserErrorCode.SamePassport);
      return true;
    }

    return false;
  }

  private updateUsersCache(users: User[]): void {
    this.usersCache = [...users];
  }
}
