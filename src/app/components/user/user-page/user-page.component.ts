import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { UserPageService } from './user-page.service';
import { UserCard } from '../user-card/user-card.typings';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { User } from '../user.typings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  providers: [UserPageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  public userCardList$: Observable<UserCard[]> =
    this.userPageService.getUserCards();

  constructor(
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private userPageService: UserPageService,
    private router: Router
  ) {}

  public showAddUserModal(): void {
    const config: MatDialogConfig = {
      hasBackdrop: true,
    };

    const dialogRef = this.matDialog.open(CreateUserModalComponent, config);
    dialogRef
      .afterClosed()
      .pipe(
        filter((user: User) => !!user),
        switchMap((user) => this.userPageService.addUser(user))
      )
      .subscribe(() => {
        this.userCardList$ = this.userPageService.getUserCards();
        this.changeDetectorRef.detectChanges();
      });
  }

  public removeUser(id: string): void {
    this.userPageService.removeUser(id).subscribe(() => {});
  }

  public sortUserCardList(): void {
    this.userCardList$ = this.userPageService.getSortedByLastNameUserCards();
  }

  public goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
