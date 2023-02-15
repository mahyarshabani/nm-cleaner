import { Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ELECTRON_API_TOKEN } from '../constant/electron-api-token';
import { IElectronAPI } from '../type.d/renderer';

@Injectable({
  providedIn: 'root',
})
export class ElectronDeleteService {
  private deleteLoadingBS$ = new BehaviorSubject<Set<string>>(new Set());
  deleteLoading$ = this.deleteLoadingBS$.asObservable();

  private deleteDoneBS$ = new Subject<string>();
  deleteDone$ = this.deleteDoneBS$.asObservable();

  get deleteLoading(): Set<string> {
    return this.deleteLoadingBS$.getValue();
  }

  constructor(
    private ngZone: NgZone,
    @Inject(ELECTRON_API_TOKEN) private electronAPI: IElectronAPI
  ) {
    this.electronAPI.deleteDone((_, deletedFolder: string) => {
      this.ngZone.run(() => {
        const decreased = this.deleteLoading;
        decreased.delete(deletedFolder);
        this.deleteLoadingBS$.next(decreased);
        this.deleteDoneBS$.next(deletedFolder);
      });
    });
  }

  delete(folder: string) {
    this.deleteLoadingBS$.next(this.deleteLoading.add(folder));
    this.electronAPI.delete(folder);
  }
}
