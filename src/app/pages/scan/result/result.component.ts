import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { combineLatest, map, merge, Observable, withLatestFrom } from 'rxjs';
import { ScanResult } from '@model';
import { DeleteService, ScanService } from '@service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  @Output() changeFolder = new EventEmitter<void>();
  private combinedScanLoading$ = combineLatest([
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
    public electronScanService: ScanService,
    public electronDeleteService: DeleteService
  ) {}

  delete(result: ScanResult) {
    if (!result.deleted && !result.deleting) {
      this.electronDeleteService.delete(result.path);
    }
  }
}
