import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MENU_DATA } from '@constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  MENU_DATA = MENU_DATA;
}
