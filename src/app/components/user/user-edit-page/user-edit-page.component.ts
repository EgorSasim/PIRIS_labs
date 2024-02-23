import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserEditPageService } from './user-edit-page.service';
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
import { BackNavigationService } from '../../../common/services/back-navigation.service';
import { CreateUserModalBuilder } from '../create-user-modal/create-user-modal.component.builder';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrl: './user-edit-page.component.scss',
  providers: [UserEditPageService, CreateUserModalBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditPageComponent implements OnInit {
  public formGroup: FormGroup<ConvertToForm<Required<User>>> =
    this.createUserModalBuilder.createForm();
  public readonly residenceCities = Object.values(UserCity);
  public readonly citizenShips = Object.values(UserCitizenship);
  public readonly martialStatuses = Object.values(UserMartialStatus);
  public readonly disabilities = Object.values(UserDisability);
  public userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userEditPageService: UserEditPageService,
    private router: Router,
    private createUserModalBuilder: CreateUserModalBuilder
  ) {}

  public ngOnInit(): void {
    this.handleRouteParams();
  }

  public getErrorMessage(errors: ValidationErrors): string {
    return getControlErorMessage(errors);
  }

  public onClose(): void {
    this.router.navigate(['/user-page']);
  }

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      alert('Сообщение об ошике!!!)');
      return;
    }
    this.userEditPageService
      .updateUser({ ...(this.formGroup.value as User), id: this.userId })
      .subscribe(() => {
        this.router.navigate(['/user-page']);
      });
  }

  private handleRouteParams(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        filter((id) => !!id),
        tap((id) => (this.userId = id)),
        switchMap((id) => this.userEditPageService.getUser(id))
      )
      .subscribe((user) => {
        this.formGroup.setValue({ id: this.userId, ...user } as Required<User>);
      });
  }
}
