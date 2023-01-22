import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ElectronScanService } from './services/electron-scan.service';
import { ElectronSelectService } from './services/electron-select.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'nm-cleaner';
  constructor(
    public electronScanService: ElectronScanService,
    public electronSelectService: ElectronSelectService
  ) {}

  openSelectFolderDialog() {
    this.electronSelectService.openSelectFolder();
  }

  async scan() {
    const selectedFolderExist = this.electronSelectService.selectedFolder;
    if (selectedFolderExist) {
      this.electronScanService.startScan(selectedFolderExist);
    }
  }

  ngOnInit(): void {}

  delete(folder: string) {
    window.electronAPI.delete(folder);
  }
}
