import {
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  MessageChannelMain,
  utilityProcess,
} from 'electron';
import { IScanMessage } from './scan-message';
import { ScanMessageEnum } from './scan-message.enum';
import * as path from 'path';

async function handleFolderOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

async function handleScan(event: IpcMainInvokeEvent, targetFolder: string) {
  const { port1, port2 } = new MessageChannelMain();
  const scanProcess = utilityProcess.fork(path.join(__dirname, 'scan.js'));
  const startScanMessage: IScanMessage<string> = {
    type: ScanMessageEnum.START_SCAN,
    payload: targetFolder,
  };
  scanProcess.postMessage(startScanMessage, [port1]);
  scanProcess.on('message', (scanProcess) => {
    console.log({ scanProcess });
  });
  port2.start();
}

const init = () => {
  ipcMain.handle('dialog:selectFolder', handleFolderOpen);
  ipcMain.handle('fs:scan', handleScan);
};

export default {
  init,
};
