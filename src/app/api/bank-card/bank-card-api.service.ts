import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import { USERS_COLLECTION_NAME } from '../user/user-api.constants';
import {
  BANK_CARD_COLLECTION_NAME,
  BANK_CARD_SERIAL_NUMBER_LENGTH,
  PIN_LENGTH,
} from './bank-card-api.constants';
import { BankCard } from './bank-card-api.typings';
import { getRandomNumber } from '../../common/helpers/random-values';
import { ValidatedPin } from '../../components/atm/pin-page/pin-page.typings';

@Injectable({
  providedIn: 'root',
})
export class BankCardApiService {
  constructor(private angularFirestore: AngularFirestore) {}

  public createBankCard(userId: string): Observable<any> {
    return from(
      this.angularFirestore
        .collection(USERS_COLLECTION_NAME)
        .doc(userId)
        .collection(BANK_CARD_COLLECTION_NAME)
        .add(this.getRandBankCardCreds(userId))
    );
  }

  public searchBankCard(serialNumber: number): Observable<BankCard | null> {
    const userIds$ = this.angularFirestore
      .collection(USERS_COLLECTION_NAME)
      .get()
      .pipe(
        map((snapshots) => snapshots.docs),
        map((docs) => docs.map((doc) => doc.id))
      );
    return userIds$.pipe(
      switchMap((ids) =>
        forkJoin([
          ...ids.map((id) =>
            forkJoin({
              userId: of(id),
              bankCardRef: this.getBankCardRefByUserId(id),
            })
          ),
        ])
      ),
      map((data) => data.filter((dataItem) => !!dataItem.bankCardRef)),
      switchMap((data) =>
        forkJoin(
          data.map((dataItem) => {
            return forkJoin({
              userId: of(dataItem.userId),
              docsData: from(dataItem.bankCardRef.get()),
            });
          })
        )
      ),
      map(
        (data) =>
          data.filter(
            (data) =>
              (data.docsData.data() as BankCard)?.serialNumber === serialNumber
          )?.[0]
      ),
      map((res) => {
        if (res) {
          return {
            pin: res.docsData.data()['pin'],
            serialNumber: res.docsData.data()['serialNumber'],
            id: res.docsData.id,
            userId: res.userId,
          };
        }
        return null;
      })
    );
  }

  public validatePin(
    userId: string,
    bankCardId: string,
    pin: number
  ): Observable<ValidatedPin> {
    return this.angularFirestore
      .collection(USERS_COLLECTION_NAME)
      .doc(userId)
      .collection(BANK_CARD_COLLECTION_NAME)
      .doc(bankCardId)
      .get()
      .pipe(
        map((bankCard) => {
          const bankCardData = bankCard.data() as BankCard;
          return {
            id: bankCard.id,
            pin: bankCardData.pin,
            serialNumber: bankCardData.serialNumber,
            userId: bankCardData.userId,
          } as BankCard;
        }),
        map((bankCard) => {
          if (bankCard.pin === pin) {
            return {
              bankCardPin: bankCard.pin,
              bankCardSerialNumber: bankCard.serialNumber,
              isValid: true,
              userId: bankCard.userId,
            };
          }
          return { isValid: false } as ValidatedPin;
        })
      );
  }

  private getBankCardRefByUserId(
    userId: string
  ): Observable<DocumentReference<DocumentData>> {
    return this.angularFirestore
      .collection(USERS_COLLECTION_NAME)
      .doc(userId)
      .collection(BANK_CARD_COLLECTION_NAME)
      .get()
      .pipe(map((snapshots) => snapshots.docs[0]?.ref));
  }

  private getRandBankCardCreds(userId): BankCard {
    return {
      pin: getRandomNumber(PIN_LENGTH),
      serialNumber: getRandomNumber(BANK_CARD_SERIAL_NUMBER_LENGTH),
      userId,
    };
  }
}
