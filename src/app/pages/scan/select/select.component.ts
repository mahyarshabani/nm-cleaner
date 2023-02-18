import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ScanService, SelectService } from '@service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  constructor(
    public electronSelectService: SelectService,
    private electronScanService: ScanService
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
