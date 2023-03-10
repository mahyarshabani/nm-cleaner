import {
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  utilityProcess,
} from 'electron';
import { DeleteMessageEnum, ScanMessageEnum, SizeMessageEnum } from './enum';
import * as path from 'path';
import { IMessage } from './interface';
import { DeleteMessageType, ScanMessageType } from './type';

type MessageListenerType =
  | ScanMessageEnum.RETURN_RESULT
  | ScanMessageEnum.SCAN_COMPLETED
  | DeleteMessageEnum.DELETE_DONE
  | SizeMessageEnum.SIZE_CALCULATION_RESULT
  | SizeMessageEnum.START_SIZE_CALCULATION;

export class Controller {
  private fsUtility: Electron.UtilityProcess;
  private messageListener: (process: IMessage<MessageListenerType>) => void;

  constructor(private window: BrowserWindow) {}

  init() {
    this.fsUtility = utilityProcess.fork(path.join(__dirname, 'fs-utility.js'));

    ipcMain.handle('dialog:selectFolder', this.handleFolderOpen.bind(this));
    ipcMain.handle('fs:scan', this.handleScan.bind(this));
    ipcMain.handle('fs:delete', this.handleDelete.bind(this));
    ipcMain.handle('window:close', this.handleCloseWindow.bind(this));
    ipcMain.handle('window:maximize', this.handleMaximizeWindow.bind(this));
    ipcMain.handle('window:minimize', this.handleMinimizeWindow.bind(this));

    this.messageListener = (process) => {
      if (process.type === ScanMessageEnum.RETURN_RESULT) {
        this.window.webContents.send('fs:scanResult', process.payload);
      }
      if (process.type === ScanMessageEnum.SCAN_COMPLETED) {
        this.window.webContents.send('fs:scanCompleted');
      }
      if (process.type === DeleteMessageEnum.DELETE_DONE) {
        this.window.webContents.send('fs:deleteDone', process.payload);
      }
      if (process.type === SizeMessageEnum.SIZE_CALCULATION_RESULT) {
        this.window.webContents.send('fs:sizeResult', process.payload);
      }
      if (process.type === SizeMessageEnum.START_SIZE_CALCULATION) {
        this.window.webContents.send('fs:sizeStarted', process.payload);
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
    const startScanMessage: ScanMessageType<string> = {
      type: ScanMessageEnum.START_SCAN,
      payload: targetFolder,
    };
    this.fsUtility.postMessage(startScanMessage);
  }

  private async handleDelete(event: IpcMainInvokeEvent, targetFolder: string) {
    const deleteMessage: DeleteMessageType<string> = {
      type: DeleteMessageEnum.DELETE,
      payload: targetFolder,
    };
    this.fsUtility.postMessage(deleteMessage);
  }

  private handleCloseWindow() {
    this.window.close();
  }

  private handleMinimizeWindow() {
    this.window.minimize();
  }

  private handleMaximizeWindow() {
    if (this.window.isMaximized()) {
      this.window.restore();
    } else {
      this.window.maximize();
    }
  }
}
