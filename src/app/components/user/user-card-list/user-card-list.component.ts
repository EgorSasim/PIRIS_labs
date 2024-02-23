import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserCard } from '../user-card/user-card.typings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card-list',
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardListComponent {
  @Input() cardList: UserCard[] = [];
  @Output() userRemove: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) {}

  public removeUser(id: string) {
    this.userRemove.emit(id);
  }

  public goToEditPage(id: string): void {
    this.router.navigate(['user', id]);
  }
}
