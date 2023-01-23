import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ElectronScanService } from '../../services/electron-scan.service';
import { ElectronSelectService } from '../../services/electron-select.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanComponent {
  page: string = 'select';

  constructor(
    public electronScanService: ElectronScanService,
    public electronSelectService: ElectronSelectService
  ) {}

  openSelectFolderDialog() {
    this.electronSelectService.openSelectFolder();
  }

  async scan() {
    this.page = 'result';
    const selectedFolderExist = this.electronSelectService.selectedFolder;
    if (selectedFolderExist) {
      this.electronScanService.startScan(selectedFolderExist);
    }
  }

  delete(folder: string) {
    window.electronAPI.delete(folder);
  }
}
