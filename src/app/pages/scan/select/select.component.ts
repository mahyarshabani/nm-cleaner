import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElectronScanService, ElectronSelectService } from '@service';
import { map } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  constructor(
    public electronSelectService: ElectronSelectService,
    private electronScanService: ElectronScanService
  ) {}

  openSelectFolderDialog() {
    this.electronSelectService.openSelectFolder();
  }

  selectFolder(folderPath: string) {
    this.electronSelectService.selectedFolder = folderPath;
  }

  cancelFolderSelection() {
    this.electronSelectService.selectedFolder = '';
  }

  startScan() {
    this.electronScanService.startScan(
      this.electronSelectService.selectedFolder
    );
  }
}
