import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateDepositModalComponent } from '../deposit/create-deposit-modal/create-deposit-modal.component';
import { Router } from '@angular/router';
import { BankAccountPageService } from './bank-account-page.service';
import { DepositContract } from '../deposit/deposit.typings';
import { Observable, filter, switchMap, tap } from 'rxjs';
import {
  BankCreditAccountInfo,
  BankDepositAccountInfo,
} from '../bank-account-list/bank-account-list.typings';
import { CreateCreditModalComponent } from '../credit/create-credit-modal/create-credit-modal.component';
import { CreditContract } from '../credit/credit.typings';

@Component({
  selector: 'app-bank-account-page',
  templateUrl: './bank-account-page.component.html',
  styleUrl: './bank-account-page.component.scss',
  providers: [BankAccountPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountPageComponent {
  public depositAccountsInfo$: Observable<BankDepositAccountInfo[]> =
    this.bankAccountPageService.getDepositAccountsInfo();
  public creditAccountsInfo$: Observable<BankCreditAccountInfo[]> =
    this.bankAccountPageService.getCreditAccountsInfo();

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private bankAccountPageService: BankAccountPageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public showCreateDepositModal(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
    };

    const dialogRef = this.matDialog.open(CreateDepositModalComponent, config);
    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        switchMap((contract: DepositContract) => {
          return this.bankAccountPageService.createDepositContract(contract);
        })
      )
      .subscribe(() => {
        this.depositAccountsInfo$ =
          this.bankAccountPageService.getDepositAccountsInfo();
        this.changeDetectorRef.detectChanges();
      });
  }

  public showCreateCreditModal(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
    };

    const dialogRef = this.matDialog.open(CreateCreditModalComponent, config);
    dialogRef
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        switchMap((contract: CreditContract) => {
          return this.bankAccountPageService.createCreditContract(contract);
        })
      )
      .subscribe(() => {
        this.creditAccountsInfo$ =
          this.bankAccountPageService.getCreditAccountsInfo();
        this.changeDetectorRef.detectChanges();
      });
  }

  public goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
