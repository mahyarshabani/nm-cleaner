import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ELECTRON_API_TOKEN } from '../constant/electron-api-token';
import { IElectronAPI } from '../type.d/renderer';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private selectedFolderBS$ = new BehaviorSubject<string>('');
  public selectedFolder$ = this.selectedFolderBS$.asObservable();

  get selectedFolder(): string {
    return this.selectedFolderBS$.getValue();
  }

  set selectedFolder(folder) {
    this.selectedFolderBS$.next(folder);
  }

  constructor(@Inject(ELECTRON_API_TOKEN) private electronAPI: IElectronAPI) {}

  openSelectFolder(): void {
    this.electronAPI.openSelectFolderDialog().then((selectedFolder) => {
      this.selectedFolderBS$.next(selectedFolder);
    });
  }
}
