import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { USERS_COLLECTION_NAME } from '../../user/user-api.constants';
import {
  CreditAccountSearchParms,
  CreditAccounts,
} from './account-api.typings';
import { CREDIT_ACCOUNT_COLLECTION_NAME } from './account-api.constants';
import { CREDIT_CONTRACTS_COLLECTION_NAME } from '../credit-api.constants';

@Injectable({
  providedIn: 'root',
})
export class CreditAccountApiService {
  constructor(private angularFireStore: AngularFirestore) {}

  public getAccounts(
    params: CreditAccountSearchParms
  ): Observable<CreditAccounts> {
    return this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(params.userId)
      .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
      .doc(params.creditId)
      .collection(CREDIT_ACCOUNT_COLLECTION_NAME)
      .get()
      .pipe(
        map((docsRef) => {
          const data = docsRef.docs[0]?.data();
          const id = docsRef.docs[0]?.id;
          return {
            ...(data as CreditAccounts),
            id,
          };
        })
      );
  }

  public updateCreditContractAccountsData({
    userId,
    creditId,
    creditAccounts,
  }: {
    userId: string;
    creditId: string;
    creditAccounts: CreditAccounts;
  }): Observable<void> {
    const accountsId$ = from(
      this.angularFireStore
        .collection(USERS_COLLECTION_NAME)
        .doc(userId)
        .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
        .doc(creditId)
        .collection(CREDIT_ACCOUNT_COLLECTION_NAME)
        .ref.get()
        .then((data) => data.docs[0].id)
    );

    return accountsId$.pipe(
      switchMap((id) =>
        this.angularFireStore
          .collection(USERS_COLLECTION_NAME)
          .doc(userId)
          .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
          .doc(creditId)
          .collection(CREDIT_ACCOUNT_COLLECTION_NAME)
          .doc(id)
          .update(creditAccounts)
      )
    );
  }
}
