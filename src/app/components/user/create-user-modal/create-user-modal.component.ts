import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateUserModalBuilder } from './create-user-modal.component.builder';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ConvertToForm } from '../../../common/typings/form.typings';
import {
  User,
  UserCitizenship,
  UserCity,
  UserDisability,
  UserMartialStatus,
} from '../user.typings';
import { getControlErorMessage } from '../../../common/helpers/control-errors';
import { AUTO_GENERATED_USER_DATA } from './create-user-modal.constants';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.scss',
  providers: [CreateUserModalBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserModalComponent {
  public readonly residenceCities = Object.values(UserCity);
  public readonly citizenShips = Object.values(UserCitizenship);
  public readonly martialStatuses = Object.values(UserMartialStatus);
  public readonly disabilities = Object.values(UserDisability);

  public formGroup: FormGroup<ConvertToForm<Required<User>>> =
    this.createUserModalBuilder.createForm();

  constructor(
    private matDialogRef: MatDialogRef<CreateUserModalComponent>,
    private createUserModalBuilder: CreateUserModalBuilder
  ) {}

  public onClose(): void {
    this.matDialogRef.close();
  }

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      alert('Сообщение об ошибке!!!)');
      return;
    }
    this.matDialogRef.close(this.formGroup.value);
  }

  public fillUserData(): void {
    this.formGroup.setValue(AUTO_GENERATED_USER_DATA as Required<User>);
  }

  public getErrorMessage(errors: ValidationErrors): string {
    return getControlErorMessage(errors);
  }
}
