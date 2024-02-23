import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConvertToForm } from '../../../../common/typings/form.typings';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Credit, CreditContract } from '../credit.typings';
import { CREDITS } from '../credit.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCreditInfo } from './create-credit-modal.typings';
import { CreateCreditModalBuilder } from './create-credit-modal.builder';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCreditModalService } from './create-credit-modal.service';
import { getControlErorMessage } from '../../../../common/helpers/control-errors';
import { getMonthDifference } from '../../../../common/helpers/dates';

@Component({
  selector: 'app-create-credit-modal',
  templateUrl: './create-credit-modal.component.html',
  styleUrl: './create-credit-modal.component.scss',
  providers: [CreateCreditModalBuilder, CreateCreditModalService, MatSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCreditModalComponent {
  public readonly credits: Credit[] = CREDITS;
  public readonly usersInfo$: Observable<UserCreditInfo[]> =
    this.createCreditModalService.getUsersInfo();

  public creditDescription$: BehaviorSubject<string> = new BehaviorSubject('');

  public formGroup: FormGroup<
    ConvertToForm<Required<Omit<CreditContract, 'id'>>>
  > = this.createCreditBuilder.createForm();
  public creditNameControl: FormControl<CreditContract['credit']['name']> =
    new FormControl(null, [Validators.required]);

  constructor(
    private createCreditBuilder: CreateCreditModalBuilder,
    private dialogRef: MatDialogRef<CreateCreditModalComponent>,
    private matSnackBar: MatSnackBar,
    private createCreditModalService: CreateCreditModalService
  ) {
    this.handleCreditNameChange();
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.formGroup.invalid || this.creditNameControl.invalid) {
      this.formGroup.markAllAsTouched();
      this.creditNameControl.markAsTouched();
      this.matSnackBar.open(
        'Please, correctly fill all necessary fields',
        null,
        { duration: 1000 }
      );
      return;
    }
    this.dialogRef.close(this.formGroup.getRawValue());
  }

  public handleCreditNameChange(): void {
    this.creditNameControl.valueChanges.subscribe((creditName) => {
      const credit = this.credits.find((credit) => credit.name === creditName);
      this.formGroup.controls.credit.setValue(credit);
      this.creditDescription$.next(this.getCreditDescriptionOutput(credit));
    });
  }

  public getErrorMessage(errors: ValidationErrors): string {
    return getControlErorMessage(errors);
  }

  private getCreditDescriptionOutput(credit: Credit): string {
    if (!credit) {
      return '';
    }
    let output = '';
    Object.entries(credit).forEach(([key, value]) => {
      if (value instanceof Date) {
        output += `${key}: ${getMonthDifference(value, new Date())} monthes\n`;
      } else {
        output += `${key}: ${value}\n`;
      }
    });
    return output;
  }
}
