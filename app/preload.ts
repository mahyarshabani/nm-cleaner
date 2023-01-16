import { contextBridge, ipcRenderer } from 'electron';
import { IElectronAPI } from '../src/app/type.d/renderer';

const electronAPI: IElectronAPI = {
  openSelectFolderDialog: () => ipcRenderer.invoke('dialog:selectFolder'),
  scan: (targetFolder) => ipcRenderer.invoke('fs:scan', targetFolder)
}
contextBridge.exposeInMainWorld('electronAPI', electronAPI)