import { Subject } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs-extra';

export class FileService {
  private inProgressScan: number = 0;
  private scanResultS$ = new Subject<string>();
  scanResult$ = this.scanResultS$.asObservable();

  constructor() {}

  startScan(target: string): void {
    this.searchNodeModules(target);
  }

  delete(data: string) {
    fs.remove(data, (err) => {
      if (err) return console.error(err);
      console.log('success!');
    });
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
