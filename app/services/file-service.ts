import { Subject } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs-extra';
import { IScanResult } from '../interface/scan-result.interface';

export class FileService {
  private inProgressScan = 0;
  private scanResultS$ = new Subject<IScanResult>();
  scanResult$ = this.scanResultS$.asObservable();
  private deleteResultS$ = new Subject<string>();
  deleteResult$ = this.deleteResultS$.asObservable();

  startScan(target: string): void {
    this.searchNodeModules(target);
  }

  delete(data: string) {
    fs.remove(data, (err) => {
      if (err) return console.error(err);
      this.deleteResultS$.next(data);
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
          this.scanResultS$.next({
            path: filePath,
            mTime: new Date(stats.mtime),
          });
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
