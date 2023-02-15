import { Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { ScanResult } from '@model';
import { ELECTRON_API_TOKEN } from '../constant/electron-api-token';
import { IElectronAPI } from '../type.d/renderer';

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

  constructor(
    private ngZone: NgZone,
    @Inject(ELECTRON_API_TOKEN) private electronAPI: IElectronAPI
  ) {
    this.electronAPI.returnScanResult((_, value: string) => {
      this.ngZone.run(() => {
        this.scanResultBS$.next([...this.scanResult, new ScanResult(value)]);
      });
    });
    this.electronAPI.scanCompleted(() => {
      this.ngZone.run(() => {
        this.scanLoadingBS$.next(false);
      });
    });
  }

  startScan(selectedFolder: string) {
    this.scanLoadingBS$.next(true);
    this.scanResultBS$.next([]);
    this.electronAPI.scan(selectedFolder);
  }
}
