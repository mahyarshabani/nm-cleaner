import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronSelectService {
  private selectedFolderBS$ = new BehaviorSubject<string>('');
  public selectedFolder$ = this.selectedFolderBS$.asObservable();

  constructor() {}

  get selectedFolder(): string {
    return this.selectedFolderBS$.getValue();
  }

  openSelectFolder(): void {
    window.electronAPI.openSelectFolderDialog().then((selectedFolder) => {
      this.selectedFolderBS$.next(selectedFolder);
    });
  }
}
