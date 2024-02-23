import { Injectable } from '@angular/core';
import { DepositContract } from '../../components/bank-account/deposit/deposit.typings';
import { Observable, filter, from, map, of, switchMap, tap } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { USERS_COLLECTION_NAME } from '../user/user-api.constants';
import { User } from '../../components/user/user.typings';
import { DEPOSIT_CONTRACTS_COLLECTION_NAME } from './deposit-api.constants';
import { createDepositAccounts } from '../../common/helpers/account';
import { DepositSearchParams } from './deposit-api.typings';
import { DEPOSIT_ACCOUNT_COLLECTION_NAME } from './account/account-api.constants';

@Injectable({
  providedIn: 'root',
})
export class DepositApiService {
  constructor(private angularFireStore: AngularFirestore) {}

  public createDepositContract(
    depositContract: DepositContract
  ): Observable<void> {
    const userCollectionRef = this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(depositContract.userId)
      .get();

    return userCollectionRef.pipe(
      switchMap((userRef) => {
        return userRef.ref
          .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
          .add(depositContract);
      }),
      switchMap((depositRef) => {
        return depositRef
          .collection(DEPOSIT_ACCOUNT_COLLECTION_NAME)
          .add(createDepositAccounts(depositContract));
      })
    ) as Observable<any>;
  }

  public getAllUsersDeposits(userId: string): Observable<DepositContract[]> {
    const userRef = this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(userId)
      .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
      .get()
      .pipe(
        map((refs) => {
          return refs.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { ...(data as DepositContract), id };
          });
        }),
        map((depositContracts) =>
          depositContracts.map((depositContract) =>
            this.getDepositContractWithNormalDateForm(depositContract)
          )
        )
      );

    return userRef;
  }

  public getDeposit(
    searchParams: DepositSearchParams
  ): Observable<DepositContract> {
    return this.angularFireStore
      .collection(USERS_COLLECTION_NAME)
      .doc(searchParams.userId)
      .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
      .doc(searchParams.depositId)
      .get()
      .pipe(
        map((depositRef) => {
          return {
            ...(depositRef.data() as DepositContract),
            id: depositRef.id,
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

  public removeDeposit(userId: string, id: string): Observable<void> {
    return from(
      this.angularFireStore
        .collection(USERS_COLLECTION_NAME)
        .doc(userId)
        .collection(DEPOSIT_CONTRACTS_COLLECTION_NAME)
        .doc(id)
        .delete()
    );
  }

  private getDepositContractWithNormalDateForm(
    depositContract: DepositContract
  ): DepositContract {
    return {
      ...depositContract,
      startDate: new Date(depositContract.startDate['seconds'] * 1000),
      endDate: new Date(depositContract.endDate['seconds'] * 1000),
      duration: new Date(depositContract.duration['seconds'] * 1000),
    };
  }
}
