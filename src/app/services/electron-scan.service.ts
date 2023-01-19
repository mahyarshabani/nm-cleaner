import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronScanService {
  private scanResultBS$ = new BehaviorSubject<string[]>([]);
  scanResult$ = this.scanResultBS$.asObservable();

  get scanResult(): string[] {
    return this.scanResultBS$.getValue();
  }

  private scanLoadingBS$ = new BehaviorSubject<boolean>(false);
  scanLoading$ = this.scanLoadingBS$.asObservable();

  get scanLoading(): boolean {
    return this.scanLoadingBS$.getValue();
  }

  constructor(private ngZone: NgZone) {
    window.electronAPI.returnScanResult((_, value: string) => {
      this.ngZone.run(() => {
        this.scanResultBS$.next([...this.scanResult, value]);
      });
    });
    window.electronAPI.scanCompleted((_) => {
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
