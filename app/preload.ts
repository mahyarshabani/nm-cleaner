import { contextBridge, ipcRenderer } from 'electron';
import { IElectronAPI } from '../src/app/type.d/renderer';

const electronAPI: IElectronAPI = {
  openSelectFolderDialog: () => ipcRenderer.invoke('dialog:selectFolder'),
  scan: (targetFolder) => ipcRenderer.invoke('fs:scan', targetFolder),
  delete: (targetFolder) => ipcRenderer.invoke('fs:delete', targetFolder),
  returnScanResult: (callback) => ipcRenderer.on('fs:scanResult', callback),
  scanCompleted: (callback) => ipcRenderer.on('fs:scanCompleted', callback),
  deleteDone: (callback) => ipcRenderer.on('fs:deleteDone', callback),
};
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
