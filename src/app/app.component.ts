import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nm-cleaner';

  openSelectFolderDialog() {
    console.log({MAHYAR: window.electronAPI});
    window.electronAPI.openSelectFolderDialog();
    // window.electronAPI.openSelectFolderDialog();
  }
}
