import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tile } from './home-page.typings';
import { TILES } from './home-page.constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public readonly tiles: Tile[] = TILES;
}
