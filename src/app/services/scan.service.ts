import { Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { ScanResult } from '@model';
import { ELECTRON_API_TOKEN } from '../constant/electron-api-token';
import { IElectronAPI } from '../type.d/renderer';

@Injectable({
  providedIn: 'root',
})
export class ScanService {
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

  constructor(
    private ngZone: NgZone,
    @Inject(ELECTRON_API_TOKEN) private electronAPI: IElectronAPI
  ) {
    this.electronAPI.returnScanResult((_, value) => {
      this.ngZone.run(() => {
        this.scanResultBS$.next([
          ...this.scanResult,
          new ScanResult(value.path, value.mTime),
        ]);
      });
    });
    this.electronAPI.scanCompleted(() => {
      this.ngZone.run(() => {
        this.scanLoadingBS$.next(false);
      });
    });
    this.electronAPI.sizeStarted((_, value) => {
      this.ngZone.run(() => {
        const scanResult = this.scanResult;
        const index = scanResult.findIndex((item) => item.path === value);
        scanResult[index].sizeCalculating = true;
        this.scanResultBS$.next([...scanResult]);
      });
    });
    this.electronAPI.returnSizeResult((_, value) => {
      this.ngZone.run(() => {
        const scanResult = this.scanResult;
        const index = scanResult.findIndex((item) => item.path === value.path);
        scanResult[index].size = value.size;
        scanResult[index].sizeCalculating = false;
        this.scanResultBS$.next([...scanResult]);
      });
    });
  }

  startScan(selectedFolder: string) {
    this.scanLoadingBS$.next(true);
    this.scanResultBS$.next([]);
    this.electronAPI.scan(selectedFolder);
  }
}
