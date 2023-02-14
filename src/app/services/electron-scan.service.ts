import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { ScanResult } from '@model';

@Injectable({
  providedIn: 'root',
})
export class ElectronScanService {
  private scanResultBS$ = new BehaviorSubject<ScanResult[]>([]);
  private scanLoadingBS$ = new BehaviorSubject<boolean>(false);
  scanResult$ = this.scanResultBS$
    .asObservable()
    .pipe(map((result) => result.sort()))
    .pipe();
  scanLoading$ = this.scanLoadingBS$.asObservable();

  get scanResult(): ScanResult[] {
    return this.scanResultBS$.getValue();
  }

  get sortedScanResult(): ScanResult[] {
    return this.scanResultBS$.getValue().sort();
  }

  get scanLoading(): boolean {
    return this.scanLoadingBS$.getValue();
  }

  constructor(private ngZone: NgZone) {
    window.electronAPI.returnScanResult((_, value: string) => {
      this.ngZone.run(() => {
        this.scanResultBS$.next([...this.scanResult, new ScanResult(value)]);
      });
    });
    window.electronAPI.scanCompleted(() => {
      this.ngZone.run(() => {
        this.scanLoadingBS$.next(false);
      });
    });
  }

  startScan(selectedFolder: string) {
    this.scanLoadingBS$.next(true);
    this.scanResultBS$.next([]);
    window.electronAPI.scan(selectedFolder);
  }
}
