import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateDepositModalBuilder } from './create-deposit-modal.builder';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ConvertToForm } from '../../../../common/typings/form.typings';
import { Deposit, DepositContract } from '../deposit.typings';
import { DEPOSITS } from '../deposit.constants';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getControlErorMessage } from '../../../../common/helpers/control-errors';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CreateDepositModalService } from './create-deposit-modal.service';
import { UserDepositInfo } from './create-deposit-modal.typings';
import { getMonthDifference } from '../../../../common/helpers/dates';

@Component({
  selector: 'app-create-deposit-modal',
  templateUrl: './create-deposit-modal.component.html',
  styleUrl: './create-deposit-modal.component.scss',
  providers: [
    CreateDepositModalBuilder,
    MatSnackBar,
    CreateDepositModalService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDepositModalComponent {
  public readonly deposits: Deposit[] = DEPOSITS;
  public readonly usersInfo$: Observable<UserDepositInfo[]> =
    this.createDepositModalService.getUsersInfo();

  public depositDescription$: BehaviorSubject<string> = new BehaviorSubject('');

  public formGroup: FormGroup<
    ConvertToForm<Required<Omit<DepositContract, 'id'>>>
  > = this.createDepositBuilder.createForm();
  public depositNameControl: FormControl<DepositContract['deposit']['name']> =
    new FormControl(null, [Validators.required]);

  constructor(
    private createDepositBuilder: CreateDepositModalBuilder,
    private dialogRef: MatDialogRef<CreateDepositModalComponent>,
    private matSnackBar: MatSnackBar,
    private createDepositModalService: CreateDepositModalService
  ) {
    this.handleDepositNameChange();
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.formGroup.invalid || this.depositNameControl.invalid) {
      this.formGroup.markAllAsTouched();
      this.depositNameControl.markAsTouched();
      this.matSnackBar.open(
        'Please, correctly fill all necessary fields',
        null,
        { duration: 1000 }
      );
      return;
    }
    this.dialogRef.close(this.formGroup.getRawValue());
  }

  public handleDepositNameChange(): void {
    this.depositNameControl.valueChanges.subscribe((depositName) => {
      const deposit = this.deposits.find(
        (deposit) => deposit.name === depositName
      );
      this.formGroup.controls.deposit.setValue(deposit);
      this.depositDescription$.next(this.getDepositDescriptionOutput(deposit));
    });
  }

  public getErrorMessage(errors: ValidationErrors): string {
    return getControlErorMessage(errors);
  }

  private getDepositDescriptionOutput(deposit: Deposit): string {
    if (!deposit) {
      return '';
    }
    let output = '';
    Object.entries(deposit).forEach(([key, value]) => {
      if (value instanceof Date) {
        output += `${key}: ${getMonthDifference(value, new Date())} monthes\n`;
      } else {
        output += `${key}: ${value}\n`;
      }
    });
    return output;
  }
}
