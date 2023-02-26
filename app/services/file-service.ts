import { Subject } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs-extra';
import { IScanResult, ISizeResult } from '../interface';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as getFolderSize from 'get-folder-size';

export class FileService {
  private inProgressScan = 0;
  private scanResultS$ = new Subject<IScanResult>();
  scanResult$ = this.scanResultS$.asObservable();
  private folderSizeResultS$ = new Subject<ISizeResult>();
  folderSizeResult$ = this.folderSizeResultS$.asObservable();
  private folderSizeStartedS$ = new Subject<string>();
  folderSizeStarted$ = this.folderSizeStartedS$.asObservable();
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

  private async startCalculateFolderSize(folderPath: string) {
    this.folderSizeStartedS$.next(folderPath);
    console.log({ getFolderSize });
    getFolderSize(folderPath, (err: unknown, size: number) => {
      if (err) {
        throw err;
      }
      this.folderSizeResultS$.next({ size: size, path: folderPath });
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
          this.startCalculateFolderSize(filePath);
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
