import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ELECTRON_API_TOKEN } from '../../constant/electron-api-token';
import { IElectronAPI } from '../../type.d/renderer';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent {
  constructor(@Inject(ELECTRON_API_TOKEN) private electronAPI: IElectronAPI) {}
  minimize() {
    this.electronAPI.minimizeWindow();
  }

  maximize() {
    this.electronAPI.maximizeWindow();
  }

  close() {
    this.electronAPI.closeWindow();
  }
}
