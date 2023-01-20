import { Subject } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

export class FileService {
  private inProgressScan: number = 0;
  private scanResultS$ = new Subject<string>();
  scanResult$ = this.scanResultS$.asObservable();

  constructor() {}

  startScan(target: string): void {
    this.searchNodeModules(target);
  }

  private async searchNodeModules(target: string) {
    this.inProgressScan++;
    const files = await fs.promises.readdir(target);
    for (const file of files) {
      const filePath = path.join(target, file);
      const stats = await fs.promises.stat(filePath);
      if (stats.isDirectory() && !file.startsWith('.')) {
        if (file === 'node_modules') {
          this.scanResultS$.next(filePath);
        } else {
          this.searchNodeModules(filePath);
        }
      }
    }
    this.inProgressScan--;
    if (this.inProgressScan === 0) {
      this.scanResultS$.complete();
    }
  }
}
