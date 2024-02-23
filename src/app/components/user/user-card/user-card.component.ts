import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserCard } from './user-card.typings';

@Component({
  selector: 'app-user-card',
  templateUrl: 'user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() public card: UserCard;
  @Output() public remove: EventEmitter<string> = new EventEmitter();

  public removeUser(event: Event, id: UserCard['id']): void {
    event.stopPropagation();
    this.remove.emit(id);
  }
}
