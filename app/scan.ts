import * as fs from 'fs';
import * as path from 'path';
import { Subject } from 'rxjs';

import { IScanMessage } from './scan-message';
import { ScanMessageEnum } from './scan-message.enum';

process.parentPort.once('message', async (e) => {
  const data: IScanMessage<string> = e.data;
  if (data.type === ScanMessageEnum.START_SCAN) {
    const scanner = new Scanner(data.payload);
    scanner.itemFound$.subscribe({
      next: (item) => {
        const message: IScanMessage<string> = {
          type: ScanMessageEnum.RETURN_RESULT,
          payload: item,
        };
        process.parentPort.postMessage(message);
        process.stdout.write;
      },
      complete: () => {
        process.exit();
      },
    });
    scanner.startScan();
  }
});

class Scanner {
  private inProgress: number = 0;
  private itemFoundS$ = new Subject<string>();
  itemFound$ = this.itemFoundS$.asObservable();

  constructor(private target: string) {}

  startScan(): void {
    this.searchNodeModules(this.target);
  }

  async searchNodeModules(target: string) {
    this.inProgress++;
    const files = await fs.promises.readdir(target);
    for (const file of files) {
      const filePath = path.join(target, file);
      const stats = await fs.promises.stat(filePath);
      if (stats.isDirectory() && !file.startsWith('.')) {
        if (file === 'node_modules') {
          this.itemFoundS$.next(filePath);
        } else {
          this.searchNodeModules(filePath);
        }
      }
    }
    this.inProgress--;
    if (this.inProgress === 0) {
      this.itemFoundS$.complete();
    }
  }
}
