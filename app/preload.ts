import { contextBridge, ipcRenderer } from 'electron';
import { IElectronAPI } from '../src/app/type.d/renderer';

const electronAPI: IElectronAPI = {
  openSelectFolderDialog: () => ipcRenderer.invoke('dialog:selectFolder'),
  scan: (targetFolder) => ipcRenderer.invoke('fs:scan', targetFolder),
  delete: (targetFolder) => ipcRenderer.invoke('fs:delete', targetFolder),
  returnScanResult: (callback) => ipcRenderer.on('fs:scanResult', callback),
  scanCompleted: (callback) => ipcRenderer.on('fs:scanCompleted', callback),
  deleteDone: (callback) => ipcRenderer.on('fs:deleteDone', callback),
  closeWindow: () => ipcRenderer.invoke('window:close'),
  maximizeWindow: () => ipcRenderer.invoke('window:maximize'),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  returnSizeResult: (callback) => ipcRenderer.on('fs:sizeResult', callback),
  sizeStarted: (callback) => ipcRenderer.on('fs:sizeStarted', callback),
};
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
