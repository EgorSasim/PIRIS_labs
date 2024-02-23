import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorPageComponent {
  public responseToLike(): void {
    alert('I like U too, boy next door)');
  }
}
