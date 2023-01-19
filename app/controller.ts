import {
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  MessageChannelMain,
  utilityProcess,
} from 'electron';
import { IScanMessage } from './scan-message';
import { ScanMessageEnum } from './scan-message.enum';
import * as path from 'path';

export class Controller {
  constructor(private window: BrowserWindow) {
    ipcMain.handle('dialog:selectFolder', this.handleFolderOpen.bind(this));
    ipcMain.handle('fs:scan', this.handleScan.bind(this));
  }

  async handleFolderOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (canceled) {
      return;
    } else {
      return filePaths[0];
    }
  }

  async handleScan(event: IpcMainInvokeEvent, targetFolder: string) {
    const { port1, port2 } = new MessageChannelMain();
    const scanProcess = utilityProcess.fork(path.join(__dirname, 'scan.js'));
    const startScanMessage: IScanMessage<string> = {
      type: ScanMessageEnum.START_SCAN,
      payload: targetFolder,
    };
    scanProcess.postMessage(startScanMessage, [port1]);
    scanProcess.on('message', (scanProcess) => {
      if (scanProcess.type === ScanMessageEnum.RETURN_RESULT) {
        this.window.webContents.send('fs:scanResult', scanProcess.payload);
      }
    });
    // TODO: Do clean up if required later
    scanProcess.on('exit', (_) => {
      this.window.webContents.send('fs:scanCompleted');
    });
    port2.start();
  }
}
