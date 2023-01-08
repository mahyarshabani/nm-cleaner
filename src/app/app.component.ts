import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'nm-cleaner';
  foldersPath: string;

  async openSelectFolderDialog() {
    this.foldersPath = await window.electronAPI.openSelectFolderDialog()
    // window.electronAPI.openSelectFolderDialog();
  }
}
