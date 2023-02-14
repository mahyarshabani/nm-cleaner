import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, merge, Observable, withLatestFrom } from 'rxjs';

import {
  ElectronDeleteService,
  ElectronScanService,
  ElectronSelectService,
} from '@service';
import { ScanResult } from '@model';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanComponent {
  page = 'select';
  combinedScanLoading$ = combineLatest([
    this.electronScanService.scanResult$,
    this.electronDeleteService.deleteLoading$,
  ]).pipe(
    map(([scanResult, deleteLoading]) => {
      scanResult.forEach((result) => {
        result.deleting = !!deleteLoading.has(result.path);
      });
      return scanResult;
    })
  );
  scanResult$: Observable<ScanResult[]> = merge(
    this.combinedScanLoading$,
    this.electronDeleteService.deleteDone$.pipe(
      withLatestFrom(this.combinedScanLoading$),
      map(([deletedPath, scanResult]) => {
        const found = scanResult.find((item) => item.path === deletedPath);
        if (found) {
          found.deleted = true;
        }
        return scanResult;
      })
    )
  );

  constructor(
    public electronScanService: ElectronScanService,
    public electronSelectService: ElectronSelectService,
    public electronDeleteService: ElectronDeleteService
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
    this.electronDeleteService.delete(folder);
  }
}
