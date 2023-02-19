import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ScanService, SelectService } from '@service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartComponent {
  @Output() folderCanceled = new EventEmitter<void>();
  @Output() scanStarted = new EventEmitter<void>();

  constructor(
    private electronScanService: ScanService,
    public electronSelectService: SelectService
  ) {}

  cancelFolderSelection() {
    this.folderCanceled.emit();
    this.electronSelectService.selectedFolder = '';
  }

  startScan() {
    this.scanStarted.emit();
    this.electronScanService.startScan(
      this.electronSelectService.selectedFolder
    );
  }
}
