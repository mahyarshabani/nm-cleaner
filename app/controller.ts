import {
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  utilityProcess,
} from 'electron';
import { ScanMessageEnum } from './enum/scan-message.enum';
import * as path from 'path';
import { IScanMessage } from './interface/scan-message.interface';
import { IDeleteMessage } from './interface/delete-message.interface';
import { DeleteMessageEnum } from './enum/delete-message.enum';

export class Controller {
  private fsUtility: Electron.UtilityProcess;
  private messageListener: (process: any) => void;
  constructor(private window: BrowserWindow) {}

  init() {
    this.fsUtility = utilityProcess.fork(path.join(__dirname, 'fs-utility.js'));

    ipcMain.handle('dialog:selectFolder', this.handleFolderOpen.bind(this));
    ipcMain.handle('fs:scan', this.handleScan.bind(this));
    ipcMain.handle('fs:delete', this.handleDelete.bind(this));



    this.messageListener = (process: any) => {
      if (process.type === ScanMessageEnum.RETURN_RESULT) {
        this.window.webContents.send('fs:scanResult', process.payload);
      }
      if (process.type === ScanMessageEnum.SCAN_COMPLETED) {
        this.window.webContents.send('fs:scanCompleted');
      }
      if (process.type === DeleteMessageEnum.DELETE_DONE) {
        this.window.webContents.send('fs:deleteDone', process.payload);
      }
    };
    this.fsUtility.on('message', this.messageListener);
  }

  private async handleFolderOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    if (canceled) {
      return;
    } else {
      return filePaths[0];
    }
  }

  private async handleScan(event: IpcMainInvokeEvent, targetFolder: string) {
    const startScanMessage: IScanMessage<string> = {
      type: ScanMessageEnum.START_SCAN,
      payload: targetFolder,
    };
    this.fsUtility.postMessage(startScanMessage);
  }

  private async handleDelete(event: IpcMainInvokeEvent, targetFolder: string) {
    const deleteMessage: IDeleteMessage<string> = {
      type: DeleteMessageEnum.DELETE,
      payload: targetFolder,
    };
    this.fsUtility.postMessage(deleteMessage);
  }
}
