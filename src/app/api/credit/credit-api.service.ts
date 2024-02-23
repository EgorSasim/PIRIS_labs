import { Injectable } from '@angular/core';
import { Observable, filter, from, map, of, switchMap, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { USERS_COLLECTION_NAME } from '../user/user-api.constants';
import { CreditContract } from '../../components/bank-account/credit/credit.typings';
import { CREDIT_CONTRACTS_COLLECTION_NAME } from './credit-api.constants';
import { CREDIT_ACCOUNT_COLLECTION_NAME } from './account/account-api.constants';
import { createCreditAccounts } from '../../common/helpers/account';
import { CreditSearchParams } from './credit-api.typings';

@Injectable({
  providedIn: 'root',
})
export class CreditApiService {
  constructor(private angularFireStore: AngularFirestore) {}

  public createCreditContract(
    creditContract: CreditContract
  ): Observable<void> {
    const userCollectionRef = this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(creditContract.userId)
      .get();

    return userCollectionRef.pipe(
      switchMap((userRef) => {
        return userRef.ref
          .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
          .add(creditContract);
      }),
      switchMap((creditRef) => {
        return creditRef
          .collection(CREDIT_ACCOUNT_COLLECTION_NAME)
          .add(createCreditAccounts(creditContract));
      })
    ) as Observable<any>;
  }

  public getAllUsersCredits(userId: string): Observable<CreditContract[]> {
    const userRef = this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(userId)
      .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
      .get()
      .pipe(
        map((refs) => {
          return refs.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { ...(data as CreditContract), id };
          });
        }),
        map((creditContracts) =>
          creditContracts.map((creditContract) =>
            this.getCreditContractWithNormalDateForm(creditContract)
          )
        )
      );

    return userRef;
  }

  public getCredit(
    searchParams: CreditSearchParams
  ): Observable<CreditContract> {
    return this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(searchParams.userId)
      .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
      .doc(searchParams.creditId)
      .get()
      .pipe(
        map((creditRef) => {
          return {
            ...(creditRef.data() as CreditContract),
            id: creditRef.id,
          };
        }),
        map((data) => {
          return {
            ...data,
            startDate: new Date(data.startDate['seconds'] * 1000),
            endDate: new Date(data.endDate['seconds'] * 1000),
            duration: new Date(data.duration['seconds'] * 1000),
          };
        })
      );
  }

  public updateCredit(
    userId: string,
    creditId: string,
    credit: CreditContract
  ): Observable<void> {
    return from(
      this.angularFireStore
        .collection(USERS_COLLECTION_NAME)
        .doc(userId)
        .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
        .doc(creditId)
        .update(credit)
    );
  }

  public removeCredit(userId: string, id: string): Observable<void> {
    return from(
      this.angularFireStore
        .collection(USERS_COLLECTION_NAME)
        .doc(userId)
        .collection(CREDIT_CONTRACTS_COLLECTION_NAME)
        .doc(id)
        .delete()
    );
  }

  private getCreditContractWithNormalDateForm(
    creditContract: CreditContract
  ): CreditContract {
    return {
      ...creditContract,
      startDate: new Date(creditContract.startDate['seconds'] * 1000),
      endDate: new Date(creditContract.endDate['seconds'] * 1000),
      duration: new Date(creditContract.duration['seconds'] * 1000),
    };
  }
}
