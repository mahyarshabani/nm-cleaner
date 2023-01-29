import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElectronScanService } from 'services';
import { ElectronSelectService } from 'services';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanComponent {
  page = 'select';

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
