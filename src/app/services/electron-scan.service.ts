import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronScanService {
  private scanResultBS$ = new BehaviorSubject<string[]>([]);
  private scanLoadingBS$ = new BehaviorSubject<boolean>(false);
  sortedScanResult$ = this.scanResultBS$.pipe(map((result) => result.sort()));
  scanLoading$ = this.scanLoadingBS$.asObservable();

  get scanResult(): string[] {
    return this.scanResultBS$.getValue();
  }
  get sortedScanResult(): string[] {
    return this.scanResultBS$.getValue().sort();
  }
  get scanLoading(): boolean {
    return this.scanLoadingBS$.getValue();
  }

  constructor(private ngZone: NgZone) {
    window.electronAPI.returnScanResult((_, value: string) => {
      this.ngZone.run(() => {
        this.scanResultBS$.next([...this.scanResult, value]);
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
