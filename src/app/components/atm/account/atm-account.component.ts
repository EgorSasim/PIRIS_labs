import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AtmAccountService } from './atm-account.service';
import { UserApiService } from '../../../api/user/user-api.service';

@Component({
  selector: 'app-atm-account',
  templateUrl: './atm-account.component.html',
  styleUrl: './atm-account.component.scss',
  providers: [AtmAccountService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtmAccountComponent implements OnInit {
  @ViewChild('moneyGetAmount') public moneyGetAmountInput: ElementRef;
  @ViewChild('moneyPutAmount') public moneyPutAmountInput: ElementRef;

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public userId: string;
  public cardId: string;
  public userName: string;
  public balance: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private atmAccountService: AtmAccountService,
    private userApiService: UserApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.handleRouteParms();
  }

  public ngOnInit(): void {
    this.getCurrentBalance();
  }

  public getCurrentBalance(): void {
    this.isLoading$.next(true);
    this.atmAccountService
      .getCurrentBalance(this.userId)
      .subscribe((balance) => {
        if (balance != 0 && !balance) {
          alert(`this user '${this.userName}' has no credits`);
          this.router.navigate(['bank-account-page']);
          return;
        }
        this.balance = balance;
        this.changeDetectorRef.detectChanges();
        this.isLoading$.next(false);
      });
  }

  public getMoney(amount: Number): void {
    this.isLoading$.next(true);
    this.atmAccountService.getMoney(this.userId, amount).subscribe(() => {
      console.log('get money');
      this.moneyGetAmountInput.nativeElement.value = '';
      this.getCurrentBalance();
    });
  }

  public putMoney(amount: Number): void {
    this.isLoading$.next(true);
    this.atmAccountService.putMoney(this.userId, amount).subscribe(() => {
      console.log('put money');
      this.moneyPutAmountInput.nativeElement.value = '';
      this.getCurrentBalance();
    });
  }

  public goToHomePage(): void {
    this.router.navigate(['home']);
  }

  private handleRouteParms(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        tap((params) => {
          (this.userId = params.get('userId')),
            (this.cardId = params.get('bankCardId'));
        }),
        switchMap((params) =>
          this.userApiService.getUser(params.get('userId'))
        ),
        tap((user) => (this.userName = user.firstName + ' ' + user.lastName))
      )
      .subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });
  }
}
